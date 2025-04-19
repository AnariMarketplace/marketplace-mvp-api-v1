import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../service/user.service';

export const getSellerInfoHandler = async (
    event: APIGatewayProxyEvent,
    service: UserService
): Promise<APIGatewayProxyResult> => {
    try {
        console.log('getSellerInfoHandler');
        console.log(event.pathParameters);
        const id = event.pathParameters?.id;
        const seller = await service.getSellerInfo(id!);
        console.log(seller);
        return {
            statusCode: 200,
            body: JSON.stringify(seller)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
