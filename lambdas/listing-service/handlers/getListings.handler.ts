import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { ApiQueryInputDto, ApiQueryValidationSchema, Listing, ListingOutputDto } from '../types/types';
import { POJO } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { SNSClient } from '@aws-sdk/client-sns';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
export const getListingHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    const payload = event.queryStringParameters ?? '{}';
    console.log('payload', payload);

    const validQuery = ApiQueryValidationSchema.parse(payload);
    console.log(validQuery);
    const mappedQuery = mapper.map<any, ApiQueryInputDto>(
        validQuery,
        POJO.LISTING_API_QUERY_UNSTRUCTURED,
        POJO.LISTING_API_QUERY
    );
    console.log(mappedQuery);

    const foundListings = await service.getAllByQuery(mappedQuery);

    const responseDto = foundListings.map((listing) =>
        mapper.map<Listing, ListingOutputDto>(listing, POJO.LISTING, POJO.LISTING_OUTPUT_DTO)
    );

    return {
        statusCode: 200,
        body: JSON.stringify(responseDto)
    };
};
