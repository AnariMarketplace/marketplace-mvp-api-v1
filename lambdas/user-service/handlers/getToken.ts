import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../service/user.service';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { SNSClient } from '@aws-sdk/client-sns';

export const getToken = async (
    event: APIGatewayProxyEvent,
    service: UserService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    try {
        console.log('getToken');
        console.log(event.pathParameters!.id!);
        const { token } = await authClient.generateTokenFromUserId(event.pathParameters!.id!);
        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
