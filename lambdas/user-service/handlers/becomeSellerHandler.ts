import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { SNSClient } from '@aws-sdk/client-sns';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../service/user.service';

export const becomeSellerHandler = async (
    event: APIGatewayProxyEvent,
    service: UserService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    console.log('Become seller handler called');
    const token = authClient.requireAuthToken(event.multiValueHeaders);
    const user = await authClient.getUserFromToken(token);
    const dbUser = await service.getUserByAuthId(user.id);
    const seller = await service.createSeller({ userId: dbUser.id, pageName: user.firstName });
    await authClient.updateAuthUserMetadata(user.id, {
        publicMetadata: {
            roles: ['seller']
        },
        privateMetadata: {
            sellerId: seller.id
        }
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: seller })
    };
};
