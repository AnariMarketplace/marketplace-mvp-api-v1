import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PaymentService } from '../service/payment.service';

export const webhookHandler = async (
    event: APIGatewayProxyEvent,
    service: PaymentService
): Promise<APIGatewayProxyResult> => {
    try {
        const webhookEvent = JSON.parse(event.body!);
        console.log(webhookEvent);
        // Handle the event
        switch (webhookEvent.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = webhookEvent.data.object;
                console.log({ paymentIntent });
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break;
            case 'payment_method.attached':
                const paymentMethod = webhookEvent.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${webhookEvent.data.object}`);
        }

        return {
            statusCode: 200,

            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({})
        };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }
        throw error;
    }
};
