import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { POJO } from '../types/constants';
import { DeliveryService } from '../service/delivery.service';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import {
    PricingRequest,
    PricingRequestInputDto,
    PricingRequestInputValidationSchema,
    PricingRequestOutputDto
} from '../types/types';
import { parse } from '@anarimarketplace/utils';
import { mapper } from '../mappers';

export const createPricingRequestHandler = async (
    event: APIGatewayProxyEvent,
    service: DeliveryService
): Promise<APIGatewayProxyResult> => {
    const payload = JSON.parse(event.body ?? '{}');
    console.log(payload);

    const validatedRequest = parse<PricingRequestInputDto>(
        PricingRequestInputValidationSchema,
        payload,
        (zErr) => new BadRequestError('Invalid pricing request input', { context: zErr.errors })
    );

    console.log(validatedRequest);

    const pricingRequest = mapper.map<PricingRequestInputDto, PricingRequest>(
        validatedRequest,
        POJO.PRICING_REQUEST_INPUT_DTO,
        POJO.PRICING_REQUEST
    );

    const createdPricingRequest = await service.createPricingRequest(pricingRequest, validatedRequest.items);

    const responseDto = mapper.map<PricingRequest, PricingRequestOutputDto>(
        createdPricingRequest,
        POJO.PRICING_REQUEST,
        POJO.PRICING_REQUEST_OUTPUT_DTO
    );

    return {
        statusCode: 201,
        body: JSON.stringify(responseDto)
    };
};
