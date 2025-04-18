import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { OrderService } from '../service/order.service';
import { CheckoutSession, CheckoutSessionInputDto, CheckoutInputValidationSchema } from '../types/types';
import { mapper } from '../mappers/orders.mapper';
import { POJO } from '../types/constants';

export const postCheckoutSessionHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');
        const validatedCheckoutSessionInput = CheckoutInputValidationSchema.parse(payload);
        console.log(payload);
        const checkoutSessionEntity = mapper.map<CheckoutSessionInputDto, CheckoutSession>(
            validatedCheckoutSessionInput,
            POJO.CHECKOUT_INPUT_DTO,
            POJO.CHECKOUT
        );

        const checkoutSession = await service.create(checkoutSessionEntity);

        const deliveryPricingRequest = await fetch(`${process.env.SERVICES_URL}/pricing-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliveryAddress: checkoutSession.deliveryAddress,

                pickupAddress: checkoutSession.pickupAddress
            })
        });
        

        const deliveryPricingRequest = await fetch(`${process.env.SERVICES_URL}/pricing-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliveryAddress: checkoutSession.deliveryAddress,

                pickupAddress: checkoutSession.pickupAddress
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
