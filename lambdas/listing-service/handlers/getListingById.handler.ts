import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { Listing, ListingOutputDto } from '../types/types';
import { POJO } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { SNSClient } from '@aws-sdk/client-sns';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
export const getListingByIdHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    console.log('Get listing by id handler', event.pathParameters);
    const foundListing = await service.getById(event.pathParameters?.id!);
    const responseDto = mapper.map<Listing, ListingOutputDto>(foundListing, POJO.LISTING, POJO.LISTING_OUTPUT_DTO);
    return {
        statusCode: 200,
        body: JSON.stringify(responseDto)
    };
};
