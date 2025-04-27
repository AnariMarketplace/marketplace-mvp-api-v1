import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { OrderService } from '../service/order.service';
import { CheckoutSession, CheckoutSessionInputDto, CheckoutSessionSummaryInputValidationSchema } from '../types/types';
import { POJO } from '../types/constants';
import { mapper } from '../mappers';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';

export const postCheckoutSessionSummaryHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');
        const checkoutSessionId = event.pathParameters?.id;
        console.log(checkoutSessionId);
        const validatedCheckoutSessionInput = CheckoutSessionSummaryInputValidationSchema.parse({
            ...payload,
            id: checkoutSessionId
        });
        // console.log(payload);
        const checkoutSessionInput = mapper.map<CheckoutSessionInputDto, CheckoutSession>(
            validatedCheckoutSessionInput,
            POJO.CHECKOUT_INPUT_DTO,
            POJO.CHECKOUT
        );

        const token = authClient.requireAuthToken(event.multiValueHeaders);
        const user = await authClient.getUserFromToken(token);

        if (!user) {
            throw new BadRequestError('User not found');
        }

        await service.updateCheckoutSession({
            id: checkoutSessionInput.id,
            orderNotes: checkoutSessionInput.orderNotes,
            deliveryAddress: checkoutSessionInput.deliveryAddress,
            customerId: user.privateMetadata.id as string
        });

        const checkoutSession = await service.getCheckoutSessionById(checkoutSessionId!);

        // console.log(checkoutSession);

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
                items: [
                    {
                        id: 'fake listing id',
                        weight: 100,
                        height: 100,
                        width: 100,
                        length: 100
                    }
                ]
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
