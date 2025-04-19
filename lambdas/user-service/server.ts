import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { Route } from './types/types';

import { createClerkClient } from '@clerk/backend';
import { patchDriverRealtimeMetadataHandler } from './handlers/patchDriverRealtimeMetadata.handler';
import { UserService } from './service/user.service';
import { getSellerInfoHandler } from './handlers/getSellerHandlerInfo';
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
        { method: 'PATCH', path: '/drivers/realtime-metadata', handler: patchDriverRealtimeMetadataHandler },
        { method: 'GET', path: '/sellers/{id}/info', handler: getSellerInfoHandler }
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
