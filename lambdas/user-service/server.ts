import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { Route } from './types/types';

import { createClerkClient } from '@clerk/backend';
import { patchDriverRealtimeMetadataHandler } from './handlers/patchDriverRealtimeMetadata.handler';
import { UserService } from './service/user.service';

//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new UserService(dbConn, mapper);
    const authClient = createClerkClient({
        publishableKey: 'pk_test_ZnVubnktZXdlLTU4LmNsZXJrLmFjY291bnRzLmRldiQ',
        secretKey: 'sk_test_IeR9sud1KkxZXGHZcSZxm680Ftp3WECRl5LMnGzfX5'
    });

    const routes: Route[] = [
        { method: 'PATCH', path: '/drivers/realtime-metadata', handler: patchDriverRealtimeMetadataHandler }
        // { method: 'GET', path: '/listings', handler: getListingHandler }
    ];

    return {
        service,
        routes,
        authClient
    };
}
