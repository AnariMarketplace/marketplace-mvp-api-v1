import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/delivery.mapper';
import { Route } from './types/types';
import { createPricingRequestHandler } from './handlers/createPricingRequest.handler';
import { DeliveryService } from './service/delivery.service';

//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new DeliveryService(dbConn, mapper);

    const routes: Route[] = [{ method: 'POST', path: '/pricing-requests', handler: createPricingRequestHandler }];

    return {
        service,
        routes
    };
}
