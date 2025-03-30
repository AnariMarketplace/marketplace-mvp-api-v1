import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { Listing, ListingInputDto, ListingInputValidationSchema, ListingOutputDto } from '../types/types';
import { POJO } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

export const createListingHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService,
    snsClient: SNSClient
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');

        const validatedListing = ListingInputValidationSchema.parse(payload);

        const listingEntity = mapper.map<ListingInputDto, Listing>(
            validatedListing,
            POJO.LISTING_INPUT_DTO,
            POJO.LISTING
        );

        const createdListing = await service.create(listingEntity);

        const responseDto = mapper.map<Listing, ListingOutputDto>(
            createdListing,
            POJO.LISTING,
            POJO.LISTING_OUTPUT_DTO
        );

        await snsClient.send(
            new PublishCommand({
                Message: JSON.stringify(responseDto),
                TopicArn: 'arn:aws:sns:us-west-2:000000000000:FanoutTopic'
            })
        );
        const testData = { ...responseDto, test: true };
        return {
            statusCode: 201,
            body: JSON.stringify(testData)
        };
    } catch (error) {
        // -- Let your main Lambda handler do the final error-to-HTTP-response mapping
        // -- by throwing a custom error with the correct statusCode.

        // Convert validation errors into your custom BadRequestError
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }

        // If it’s some other error you specifically want to treat as a "bad request,"
        // you could also throw a BadRequestError here.
        // Otherwise, re-throw so the main Lambda handler sees it and returns a 500.
        throw error;
    }
};
