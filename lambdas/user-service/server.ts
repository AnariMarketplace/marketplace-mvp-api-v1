import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { Route } from './types/types';
import { ListingService } from './service/listing.service';
import { createListingHandler } from './handlers/createListing.handler';
import { getListingHandler } from './handlers/getListings.handler';

//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new ListingService(dbConn, mapper);

    const routes: Route[] = [
        { method: 'POST', path: '/listings', handler: createListingHandler },
        { method: 'GET', path: '/listings', handler: getListingHandler }
    ];

    return {
        service,
        routes
    };
}
