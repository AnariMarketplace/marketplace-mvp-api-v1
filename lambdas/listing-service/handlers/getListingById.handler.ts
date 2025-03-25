import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { ApiQueryInputDto, ApiQueryValidationSchema, Listing, ListingOutputDto } from '../types/types';
import { POJO } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';

export const getListingByIdHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService
): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.pathParameters);
        // const payload = event.queryStringParameters ?? '{}';
        // console.log(payload);
        // const validQuery = ApiQueryValidationSchema.parse(payload);
        // console.log(validQuery);
        // const mappedQuery = mapper.map<any, ApiQueryInputDto>(
        //     validQuery,
        //     POJO.LISTING_API_QUERY_UNSTRUCTURED,
        //     POJO.LISTING_API_QUERY
        // );
        // console.log(mappedQuery);

        // const foundListings = await service.getAllByQuery(mappedQuery);

        // const responseDto = foundListings.map((listing) =>
        //     mapper.map<Listing, ListingOutputDto>(listing, POJO.LISTING, POJO.LISTING_OUTPUT_DTO)
        // );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'did i find it ?'
            })
        };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }

        throw error;
    }
};
