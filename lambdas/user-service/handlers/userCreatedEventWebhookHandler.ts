import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../service/user.service';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { SNSClient } from '@aws-sdk/client-sns';

export const userCreatedEventWebhookHandler = async (
    event: APIGatewayProxyEvent,
    service: UserService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    const res = authClient.parseAuthWebhookEvent('user.created', event, 'whsec_IOKi5MouT6zsCKqJdK/wWYJRhv8KFTAb');
    console.log(res);
    console.log(res.data);
    await service.createUser({
        authId: res.data.id
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User created event webhook processed' })
    };
};
