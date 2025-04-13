import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/delivery.mapper';
import { POJO } from '../types/constants';
import { DeliveryService } from '../service/delivery.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { PricingRequest, PricingRequestInputDto, PricingRequestInputValidationSchema, PricingRequestOutputDto } from '../types/types';

export const createPricingRequestHandler = async (
    event: APIGatewayProxyEvent,
    service: DeliveryService
): Promise<APIGatewayProxyResult> => {
    try {

        const payload = JSON.parse(event.body ?? '{}');
        console.log("hey")

        console.log(payload)
        const validatedRequest = PricingRequestInputValidationSchema.parse(payload);

        const pricingRequest = mapper.map<PricingRequestInputDto, PricingRequest>(
            validatedRequest,
            POJO.PRICING_REQUEST_INPUT_DTO,
            POJO.PRICING_REQUEST
        );

        const createdPricingRequest = await service.create(pricingRequest);
        
        const responseDto = mapper.map<PricingRequest, PricingRequestOutputDto>(
            createdPricingRequest,
            POJO.PRICING_REQUEST,
            POJO.PRICING_REQUEST_OUTPUT_DTO
        );

        return {
            statusCode: 201,
            body: JSON.stringify(responseDto)
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
