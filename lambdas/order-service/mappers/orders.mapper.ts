import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { CheckoutSession, CheckoutSessionInputDto, CheckoutOutputDto, DeliveryDetails } from '../types/types';
import { CheckoutSessionTableSelectSchema } from '../db/schema';

export function createMetadata() {
    PojosMetadataMap.create<CheckoutSession>(POJO.CHECKOUT, {
        id: String,
        deliveryPricingRequestId: String,
        subtotal: Number,
        deliveryAddress: String,
        pickupAddress: String,
        customerId: String
        // metadata: POJO.MESSAGE_METADATA,
    });
    PojosMetadataMap.create<CheckoutOutputDto>(POJO.CHECKOUT_OUTPUT_DTO, {
        id: String,
        deliveryDetails: POJO.DELIVERY_DETAILS,
        subtotal: Number

        // metadata: POJO.MESSAGE_METADATA
    });
    PojosMetadataMap.create<CheckoutSessionInputDto>(POJO.CHECKOUT_INPUT_DTO, {
        deliveryAddress: String,
        listingIds: Array,
        customerId: String,
        orderNotes: String,
        pickupTime: String
    });
    PojosMetadataMap.create<{ id: string; name: string; email: string; phone: string }>(POJO.CUSTOMER_INFO, {
        id: String,
        name: String,
        email: String,
        phone: String
    });
    PojosMetadataMap.create<CheckoutSessionTableSelectSchema>(POJO.CHECKOUT_TABLE_SCHEMA, {
        id: String,
        deliveryPricingRequestId: String,
        subtotal: Number,
        deliveryAddress: String,
        pickupAddress: String,
        customerId: String
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
        expiresAt: String,
        createdAt: String,
        updatedAt: String
    });
}

createMetadata();
export const mapper = createMapper({ strategyInitializer: pojos() });

createMap<CheckoutSession, CheckoutOutputDto>(mapper, POJO.CHECKOUT, POJO.CHECKOUT_OUTPUT_DTO);
createMap<CheckoutSessionInputDto, CheckoutSession>(mapper, POJO.CHECKOUT_INPUT_DTO, POJO.CHECKOUT);
createMap<CheckoutSessionTableSelectSchema, CheckoutSession>(mapper, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
