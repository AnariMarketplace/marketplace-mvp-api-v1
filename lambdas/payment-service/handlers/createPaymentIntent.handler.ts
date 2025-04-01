import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PaymentService } from '../service/payment.service';

export const createPaymentIntentHandler = async (
    event: APIGatewayProxyEvent,
    service: PaymentService
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');

        const intent = await service.createPaymentIntent(payload.checkoutRequestId);

        return {
            statusCode: 201,
            body: JSON.stringify(intent)
        };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }
        throw error;
    }
};
