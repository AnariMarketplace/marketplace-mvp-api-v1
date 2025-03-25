import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PaymentService } from '../service/paymentIntent.service';

export const createPaymentIntentHandler = async (
    event: APIGatewayProxyEvent,
    service: PaymentService
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');

        const intent = await service.createPaymentIntent(payload.checkoutRequestId);

        return {
            statusCode: 201,

            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(intent)
        };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }
        throw error;
    }
};
