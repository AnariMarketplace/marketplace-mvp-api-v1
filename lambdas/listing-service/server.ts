import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { ListingService } from './service/listing.service';
import { createListingHandler } from './handlers/createListing.handler';
import { getListingHandler } from './handlers/getListings.handler';
import { getListingByIdHandler } from './handlers/getListingById.handler';
import { SNSClient } from '@aws-sdk/client-sns';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { Route } from '@anarimarketplace/match-route';
import { getListingOrderContextByListingIdsHandler } from './handlers/getListingOrderContextByListingId';

export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new ListingService(dbConn, mapper);

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
        { method: 'POST', path: '/listings', handler: createListingHandler },
        { method: 'GET', path: '/listings', handler: getListingHandler },
        { method: 'GET', path: '/listings/order-context', handler: getListingOrderContextByListingIdsHandler },
        { method: 'GET', path: '/listings/{id}', handler: getListingByIdHandler }
    ];

    return {
        service,
        routes,
        snsClient,
        authClient
    };
}
