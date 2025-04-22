import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createPricingRequestHandler } from './handlers/createPricingRequest.handler';
import { DeliveryService } from './service/delivery.service';
import { Route } from '@anarimarketplace/match-route';
import { SNSClient } from '@aws-sdk/client-sns';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { mapper } from './mappers';

//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new DeliveryService(dbConn, mapper);

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

    const routes: Route[] = [{ method: 'POST', path: '/pricing-requests', handler: createPricingRequestHandler }];

    return {
        service,
        routes,
        snsClient,
        authClient
    };
}
