import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/delivery.mapper';
import { POJO } from '../types/constants';
import { DeliveryService } from '../service/delivery.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PricingRequest, PricingRequestOutputDto } from '../types/types';

export const createPricingRequestHandler = async (
    event: APIGatewayProxyEvent,
    service: DeliveryService
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

        const mappedPR = mapper.map<PricingRequest, PricingRequestOutputDto>(
            {
                id: '7c8b649c-f967-4216-96ed-cb23dbcdd426',
                recommendedCategory: 'XL',
                travelTime: 14405,
                travelDistance: 15,
                totalFee: 10.5,
                surcharges: [
                    {
                        reason: 'High Congestion Area',
                        fee: 0.5
                    }
                ],
                distanceCharge: 5.0,
                weightCharge: 5.0,
                expiresAt: '',
                createdAt: '',
                recommendedVehicleSizeCategory: 'MED',
                updatedAt: '',
                selectedPickupTime: '9:00AM'
            },
            POJO.PRICING_REQUEST,
            POJO.PRICING_REQUEST_OUTPUT_DTO
        );
        console.log(mappedPR);

        return {
            statusCode: 201,
            body: JSON.stringify(mappedPR)
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
