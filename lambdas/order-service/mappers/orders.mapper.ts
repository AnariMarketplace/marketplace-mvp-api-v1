import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { Checkout, CheckoutInputDto, CheckoutOutputDto } from '../types/types';
import { CheckoutRequestTableSelectSchema o} from '../db/schema';

export function createMetadata() {
    PojosMetadataMap.create<Checkout>(POJO.CHECKOUT, {
        id: String,
        deliveryPricingRequestId: String,
        subtotal: Number,
        // metadata: POJO.MESSAGE_METADATA,
    });
    PojosMetadataMap.create<CheckoutOutputDto>(POJO.CHECKOUT_OUTPUT_DTO, {
        id: String,
        deliveryDetails: Array,
        subtotal: Number,
        // metadata: POJO.MESSAGE_METADATA
    });
    PojosMetadataMap.create<CheckoutInputDto>(POJO.CHECKOUT_INPUT_DTO, {
        deliveryAddress: String,
        // metadata: POJO.MESSAGE_METADATA
    });
    PojosMetadataMap.create<CheckoutRequestTableSelectSchema>(POJO.CHECKOUT_TABLE_SCHEMA, {
        id: String,
        deliveryPricingRequestId: String,
        subtotal: Number,
    });
}

createMetadata();

export const mapper = createMapper({ strategyInitializer: pojos() });