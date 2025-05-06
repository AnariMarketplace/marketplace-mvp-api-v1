import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { mapper } from './mappers/listings.mapper';
import { patchDriverRealtimeMetadataHandler } from './handlers/patchDriverRealtimeMetadata.handler';
import { UserService } from './service/user.service';
import { getSellerInfoHandler } from './handlers/getSellerHandlerInfo';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { Route } from '@anarimarketplace/routing';
import { SNSClient } from '@aws-sdk/client-sns';
import { getToken } from './handlers/getToken';
import { userCreatedEventWebhookHandler } from './handlers/userCreatedEventWebhookHandler';
//Setup server
export function initServer() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const dbConn = drizzle({ client, casing: 'snake_case' });
    const service = new UserService(dbConn, mapper);
    // const authClient = new ServerAuthClient({
    //     //DRIVER CLIENT
    //     publishableKey: 'pk_test_ZnVubnktZXdlLTU4LmNsZXJrLmFjY291bnRzLmRldiQ',
    //     secretKey: 'sk_test_IeR9sud1KkxZXGHZcSZxm680Ftp3WECRl5LMnGzfX5'
    // });

    const snsClient = new SNSClient({
        region: 'us-west-2',
        endpoint: 'http://host.docker.internal:4566', // LocalStack endpoint
        credentials: {
            accessKeyId: 'test', // Dummy credentials for LocalStack
            secretAccessKey: 'test'
        }
    });

    const authClient = new ServerAuthClient({
        //MARKETPLACE CLIENT
        publishableKey: 'pk_test_c3VwZXItc25pcGUtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA',
        secretKey: 'sk_test_jlDQXm7TW7PejKHhMONKcgnsHaoH5m56ltNVFzhNc6'
    });

    const routes: Route[] = [
        { method: 'PATCH', path: '/drivers/realtime-metadata', handler: patchDriverRealtimeMetadataHandler },
        { method: 'GET', path: '/sellers/{id}/info', handler: getSellerInfoHandler },
        { method: 'GET', path: '/auth/{id}/token', handler: getToken },
        { method: 'POST', path: '/auth/webhook/user-created', handler: userCreatedEventWebhookHandler }
    ];

    return {
        service,
        routes,
        snsClient,
        authClient
    };
}
