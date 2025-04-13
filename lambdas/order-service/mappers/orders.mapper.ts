import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { Checkout, CheckoutInputDto, CheckoutOutputDto, DeliveryDetails } from '../types/types';
import { CheckoutRequestTableSelectSchema} from '../db/schema';

export function createMetadata() {
    PojosMetadataMap.create<Checkout>(POJO.CHECKOUT, {
        id: String,
        deliveryPricingRequestId: String,
        subtotal: Number,
        // metadata: POJO.MESSAGE_METADATA,
    });
    PojosMetadataMap.create<CheckoutOutputDto>(POJO.CHECKOUT_OUTPUT_DTO, {
        id: String,
        deliveryDetails: POJO.DELIVERY_DETAILS,
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
    PojosMetadataMap.create<DeliveryDetails>(POJO.DELIVERY_DETAILS, {
        recommendedCategory: String,
        recommendedVehicleSizeCategory: String,
        totalFee: Number,
        surcharges: Array,
        distanceCharged: Number,
        weightCharge: Number,
        travelDistance: Number,
        travelTime: Number,
        selectedPickupTime: String,
        expitesAt: String,
        createdAt: String, 
        updatedAt: String,
    });
}

createMetadata();

export const mapper = createMapper({ strategyInitializer: pojos() });