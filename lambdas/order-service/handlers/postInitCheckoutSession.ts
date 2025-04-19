import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { OrderService } from '../service/order.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';

export const postInitCheckoutSessionHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');
        if (!payload.listingIds) {
            throw new BadRequestError('Listing IDs are required');
        }

        console.log('event headers', event.multiValueHeaders);

        const token = authClient.requireAuthToken(event.multiValueHeaders);
        console.log('token', token);

        const user = await authClient.getUserFromToken(token);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        console.log('user', user);

        //collect order context listing details
        const url = `${process.env.SERVICES_URL}/listings/order-context?listingIds=${payload.listingIds[0]}`;
        console.log('url', url);
        const listing = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const listingData = await listing.json();
        console.log('listingData', listingData);

        const sellerId = listingData[0].sellerId;

        //get seller details i.e pickup address
        const seller = await fetch(`${process.env.SERVICES_URL}/sellers/${sellerId}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const sellerData = await seller.json();

        console.log('sellerData', sellerData);

        // save checkout session details

        const checkoutSession = await service.createCheckoutSession({
            listingIds: payload.listingIds,
            pickupAddress: sellerData.pickupAddress,
            customerId: user.privateMetadata.id as string
        });

        // console.log(checkoutSession);
        return {
            statusCode: 200,
            body: JSON.stringify({ checkoutSessionId: checkoutSession.id })
        };
    } catch (error) {
        console.error('postInitCheckoutSessionHandler error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
            isBadRequest: error instanceof BadRequestError
        });

        const statusCode = error instanceof BadRequestError ? 400 : 500;
        return {
            statusCode,
            body: JSON.stringify({ message: error instanceof Error ? error.message : 'Unknown error' })
        };
    }
};
