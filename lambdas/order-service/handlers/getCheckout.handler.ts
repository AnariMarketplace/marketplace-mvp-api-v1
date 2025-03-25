import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PaymentService } from '../service/paymentIntent.service';

export const getCheckoutHandler = async (
    event: APIGatewayProxyEvent,
    service: PaymentService
): Promise<APIGatewayProxyResult> => {
    try {
        // const payload = JSON.parse(event.body ?? '{}');

        // const intent = await service.createPaymentIntent(payload.checkoutRequestId);

        const deliveryPricingRequest = await fetch('http://host.docker.internal:3000/pricing-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        console.log(deliveryPricingRequest);
        const dpr = await deliveryPricingRequest.json();
        console.log(dpr);
        return {
            statusCode: 201,
            body: JSON.stringify({
                ...dpr,
                total: 100 + dpr.feeBreakdown.total
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
