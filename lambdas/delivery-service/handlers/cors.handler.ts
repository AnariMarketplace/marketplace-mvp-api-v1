import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { ListingService } from '../service/listing.service';

export const coorsHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService
): Promise<APIGatewayProxyResult> => {
    try {
        return {
            statusCode: 200,

            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({})
        };
    } catch (error) {
        throw error;
    }
};
