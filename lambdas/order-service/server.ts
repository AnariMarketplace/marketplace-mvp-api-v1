import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/orders.mapper';
import { Route } from './types/types';
// import { ListingService } from './service/paymentIntent.service';
// import { createPaymentIntentHandler } from './handlers/getCheckout.handler';
import { OrderService } from './service/order.service';
import Stripe from 'stripe';
import { postCheckoutSessionHandler as postCheckoutSessionHandler } from './handlers/postCheckoutSessionHandler';
import { postInitCheckoutSessionHandler } from './handlers/postInitCheckoutSession';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    // const stripeApiKey =
    //     'sk_test_51QiMYvGUPCXDYpQ6Yq9Z7scA5L027SwwLeEoDqGLACg9YP2Rxf2ZYg9pA8ZGLAEZBsvRcz20yNYRCSzH8Ftr7GWX009Zf7ZLMs';
    // const stripeClient = new Stripe(stripeApiKey);
    const service = new OrderService(dbConn, mapper);
    const authClient = new ServerAuthClient({
        publishableKey: 'pk_test_c3VwZXItc25pcGUtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA',
        secretKey: 'sk_test_jlDQXm7TW7PejKHhMONKcgnsHaoH5m56ltNVFzhNc6'
    });

    const routes: Route[] = [
        { method: 'POST', path: '/checkout-session/{id}/summary', handler: postCheckoutSessionHandler },
        { method: 'POST', path: '/init-checkout-session', handler: postInitCheckoutSessionHandler }
    ];

    return {
        service,
        routes,
        authClient
    };
}

export const matchRoute = (routes: Route[], method: string, path: string) => {
    console.log('path ' + path);
    const requestSegments = path.split('/').filter(Boolean);

    for (const route of routes) {
        if (route.method !== method) continue;

        const routeSegments = route.path.split('/').filter(Boolean);

        if (routeSegments.length !== requestSegments.length) continue;

        const params: Record<string, string> = {};

        const matched = routeSegments.every((segment, i) => {
            if (segment.startsWith('{') && segment.endsWith('}')) {
                const paramName = segment.slice(1, -1);
                params[paramName] = requestSegments[i];
                return true;
            }
            return segment === requestSegments[i];
        });

        if (matched) {
            return { route, params };
        }
    }

    return null;
};
