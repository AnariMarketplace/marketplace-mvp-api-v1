import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { OrderService } from '../service/order.service';
import { Checkout, CheckoutInputDto, CheckoutInputValidationSchema } from '../types/types';
import { mapper } from '../mappers/orders.mapper';
import { POJO } from '../types/constants';

export const getCheckoutHandler = async (
    event: APIGatewayProxyEvent,
    service: OrderService
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');
        const validatedListing = CheckoutInputValidationSchema.parse(payload);

        const checkoutEntity = mapper.map<CheckoutInputDto, Checkout>(
            validatedListing,
            POJO.CHECKOUT_INPUT_DTO,
            POJO.CHECKOUT
        );

        const checkout = await service.create(checkoutEntity);

        checkout.deliveryAddress
        checkout.pickupAddress

        const deliveryPricingRequest = await fetch(`${process.env.SERVICES_URL}/pricing-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliveryAdress: checkout.deliveryAddress,
                pickupAddress: checkout.pickupAddress
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
