import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { SNSClient } from '@aws-sdk/client-sns';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { OrderService } from '../service/order.service';
import { mapper } from '../mappers';
import { POJO } from '../types/constants';

export const getCheckoutSessionSummaryHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    const token = authClient.requireAuthToken(event.multiValueHeaders);
    const user = await authClient.getUserFromToken(token);
    const checkoutSessionId = event.pathParameters?.id;
    const checkoutSession = await service.getCheckoutSessionById(checkoutSessionId!);
    if (checkoutSession.customerId !== user.privateMetadata.id) {
        throw Error('Unauthorized');
    }
    checkoutSession.deliveryDetails = {
        recommendedCategory: 'XL',

        totalFee: 30,
        surcharges: [
            {
                reason: 'High Traffic',
                fee: 1.5
            }
        ],
        distanceCharged: 15,
        weightCharge: 15,
        travelTime: 60,
        selectedPickupTime: 'ASAP',
        createdAt: '2025-04-30T15:02:26.470Z',
        updatedAt: '2025-04-30T15:02:26.470Z'
    };
    //TODO get delivery pricing request when endpoint added
    return {
        statusCode: 200,
        body: JSON.stringify(mapper.map(checkoutSession, POJO.CHECKOUT, POJO.CHECKOUT_OUTPUT_DTO))
    };
};
