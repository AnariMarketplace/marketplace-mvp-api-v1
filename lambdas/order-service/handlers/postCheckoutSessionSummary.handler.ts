import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { OrderService } from '../service/order.service';
import { CheckoutSession, CheckoutSessionInputDto, CheckoutSessionSummaryInputValidationSchema } from '../types/types';
import { POJO } from '../types/constants';
import { mapper } from '../mappers';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { SNSClient } from '@aws-sdk/client-sns';

export const postCheckoutSessionSummaryHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');
        const checkoutSessionId = event.pathParameters?.id;
        console.log('checkout session id', checkoutSessionId);
        const validatedCheckoutSessionInput = CheckoutSessionSummaryInputValidationSchema.parse({
            ...payload,
            id: checkoutSessionId
        });
        console.log(validatedCheckoutSessionInput);
        const checkoutSessionInput = mapper.map<CheckoutSessionInputDto, CheckoutSession>(
            validatedCheckoutSessionInput,
            POJO.CHECKOUT_INPUT_DTO,
            POJO.CHECKOUT
        );
        console.log(checkoutSessionInput);
        const token = authClient.requireAuthToken(event.multiValueHeaders);
        const user = await authClient.getUserFromToken(token);

        if (!user) {
            throw new BadRequestError('User not found');
        }

        await service.updateCheckoutSession({
            id: validatedCheckoutSessionInput.id,
            orderNotes: validatedCheckoutSessionInput.orderNotes,
            deliveryAddress: validatedCheckoutSessionInput.deliveryAddress,
            customerId: user.privateMetadata.id as string
        });

        const checkoutSession = await service.getCheckoutSessionById(checkoutSessionId!);

        console.log('checkout session', checkoutSession);

        // if (checkoutSession.customerId !== customerId) {
        //     throw new Error('Unauthorized');
        // }

        const deliveryPricingRequest = await fetch(`${process.env.SERVICES_URL}/pricing-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliveryAddress: checkoutSession.deliveryAddress,
                pickupAddress: checkoutSession.pickupAddress,
                items: checkoutSession.listings
            })
        });

        console.log(deliveryPricingRequest);
        const dpr = await deliveryPricingRequest.json();
        console.log(dpr);
        return {
            statusCode: 201,
            body: JSON.stringify({
                ...dpr,
                total: 100 + dpr.totalFee
            })
        };
    } catch (error) {
        // -- Let your main Lambda handler do the final error-to-HTTP-response mapping
        // -- by throwing a custom error with the correct statusCode.

        // Convert validation errors into your custom BadRequestError
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }

        // If it’s some other error you specifically want to treat as a "bad request,"
        // you could also throw a BadRequestError here.
        // Otherwise, re-throw so the main Lambda handler sees it and returns a 500.
        throw error;
    }
};
