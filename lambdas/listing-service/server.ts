import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { Route } from './types/types';
import { ListingService } from './service/listing.service';
import { createListingHandler } from './handlers/createListing.handler';
import { getListingHandler } from './handlers/getListings.handler';
import { getListingByIdHandler } from './handlers/getListingById.handler';
import { SNSClient } from '@aws-sdk/client-sns';

// Setup server
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

    const routes: Route[] = [
        { method: 'POST', path: '/listings', handler: createListingHandler },
        { method: 'GET', path: '/listings', handler: getListingHandler },
        { method: 'GET', path: '/listings/{id}', handler: getListingByIdHandler }
    ];

    return {
        service,
        routes,
        snsClient
    };
}

export const matchRoute = (routes: Route[], method: string, path: string) => {
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
