import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { Listing, ListingInputDto, ListingInputValidationSchema, ListingOutputDto } from '../types/types';
import { POJO } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';

export const createPricingRequestHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService
): Promise<APIGatewayProxyResult> => {
    try {
        const payload = JSON.parse(event.body ?? '{}');

        // const validatedRequest = ListingInputValidationSchema.parse(payload);

        // const listingEntity = mapper.map<ListingInputDto, Listing>(
        //     validatedListing,
        //     POJO.LISTING_INPUT_DTO,
        //     POJO.LISTING
        // );

        // const createdListing = await service.create(listingEntity);

        // const responseDto = mapper.map<Listing, ListingOutputDto>(
        //     createdListing,
        //     POJO.LISTING,
        //     POJO.LISTING_OUTPUT_DTO
        // );

        return {
            statusCode: 201,
            body: JSON.stringify({
                pricingRequestId: '7c8b649c-f967-4216-96ed-cb23dbcdd426',
                category: 'ANARI XL',
                travelTime: '25 mins',
                travelDistance: 'test milessssssss',
                estimatedDeliveryTime: '45 mins',
                feeBreakdown: {
                    total: 10.5,
                    surcharges: [
                        {
                            reason: 'High Congestion Area',
                            fee: 0.5
                        }
                    ],
                    distanceCharge: 5.0,
                    weightCharge: 5.0
                },
                estimatedArrivalTime: '5:30 PM',
                expiresAt: 1742831956
            })
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
