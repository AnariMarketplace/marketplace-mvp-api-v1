import { createMapper, createMap } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import { POJO } from '../types/constants';
import {
    Delivery,
    DeliveryOutputDto,
    DeliveryInput,
    PricingRequest,
    PricingRequestOutputDto,
    PricingRequestInputDto,
    DeliveryTableSelectSchema,
    PricingRequestTableSelectSchema
} from '../types/types';
import { loadPricingRequestMappings } from './pricing-request.mapper';
import { loadDeliveryMappings } from './delivery.mapper';

function createMetadataMappings() {
    loadDeliveryMappings();
    loadPricingRequestMappings();
}

export const mapper = createMapper({ strategyInitializer: pojos() });
export default createMetadataMappings();

createMetadataMappings();
createMap<Delivery, DeliveryOutputDto>(mapper, POJO.DELIVERY, POJO.DELIVERY_OUTPUT_DTO);
createMap<DeliveryInput, Delivery>(mapper, POJO.DELIVERY_INPUT_DTO, POJO.DELIVERY);
createMap<DeliveryTableSelectSchema, Delivery>(mapper, POJO.DELIVERY_TABLE_SCHEMA, POJO.DELIVERY);

createMap<PricingRequest, PricingRequestOutputDto>(mapper, POJO.PRICING_REQUEST, POJO.PRICING_REQUEST_OUTPUT_DTO);
createMap<PricingRequestInputDto, PricingRequest>(mapper, POJO.PRICING_REQUEST_INPUT_DTO, POJO.PRICING_REQUEST);
createMap<PricingRequestTableSelectSchema, PricingRequest>(
    mapper,
    POJO.PRICING_REQUEST_TABLE_SCHEMA,
    POJO.PRICING_REQUEST
);
