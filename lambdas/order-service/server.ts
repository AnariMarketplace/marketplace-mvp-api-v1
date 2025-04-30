import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// import { ListingService } from './service/paymentIntent.service';
// import { createPaymentIntentHandler } from './handlers/getCheckout.handler';
import { OrderService } from './service/order.service';
import { postInitCheckoutSessionHandler } from './handlers/postInitCheckoutSession';
import { mapper } from './mappers';
import { Route } from '@anarimarketplace/routing';
import { SNSClient } from '@aws-sdk/client-sns';
import { postCheckoutSessionSummaryHandler } from './handlers/postCheckoutSessionSummary.handler';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });

    const service = new OrderService(dbConn, mapper);

    // Create an SNS client instance
    const snsClient = new SNSClient({
        region: 'us-west-2',
        endpoint: 'http://host.docker.internal:4566', // LocalStack endpoint
        credentials: {
            accessKeyId: 'test', // Dummy credentials for LocalStack
            secretAccessKey: 'test'
        }
    });

    const authClient = new ServerAuthClient({
        publishableKey: 'pk_test_c3VwZXItc25pcGUtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA',
        secretKey: 'sk_test_jlDQXm7TW7PejKHhMONKcgnsHaoH5m56ltNVFzhNc6'
    });

    const routes: Route[] = [
        { method: 'POST', path: '/checkout-session/{id}/summary', handler: postCheckoutSessionSummaryHandler },
        { method: 'POST', path: '/init-checkout-session', handler: postInitCheckoutSessionHandler }
    ];

    return {
        service,
        routes,
        snsClient,
        authClient
    };
}
