import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ListingService } from '../service/listing.service';
import { SNSClient } from '@aws-sdk/client-sns';

export const getListingOrderContextByListingIdsHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService,
    snsClient: SNSClient
): Promise<APIGatewayProxyResult> => {
    console.log('-------------LISTING SERVICE GET LISTING ORDER CONTEXT BY LISTING IDS-------------------');
    const payload = event.queryStringParameters ?? '{}';
    console.log('payload', payload);
    //@ts-ignore
    console.log('listingIds--------------->', payload.listingIds);
    //@ts-ignore
    if (!payload.listingIds) {
        throw new Error('listingIds is required');
    }
    //@ts-ignore
    const res = await service.getListingOrderContextByListingIds(payload.listingIds);
    console.log('res--------------->', res);
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
