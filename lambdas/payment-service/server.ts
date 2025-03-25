import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/payments.mapper';
import { Route } from './types/types';
// import { ListingService } from './service/paymentIntent.service';
import { createPaymentIntentHandler } from './handlers/createPaymentIntent.handler';
import { PaymentService } from './service/paymentIntent.service';
import Stripe from 'stripe';
import { coorsHandler } from './handlers/cors.handler';
import { webhookHandler } from './handlers/webhook.handler';

//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const stripeApiKey =
        'sk_test_51QiMYvGUPCXDYpQ6Yq9Z7scA5L027SwwLeEoDqGLACg9YP2Rxf2ZYg9pA8ZGLAEZBsvRcz20yNYRCSzH8Ftr7GWX009Zf7ZLMs';
    const stripeClient = new Stripe(stripeApiKey);
    const service = new PaymentService(dbConn, mapper, stripeClient);

    const routes: Route[] = [
        { method: 'POST', path: '/start-payment-intent', handler: createPaymentIntentHandler },
        { method: 'OPTIONS', path: '/start-payment-intent', handler: coorsHandler },
        { method: 'POST', path: '/payment-service/webhook', handler: webhookHandler }
    ];

    return {
        service,
        routes
    };
}
