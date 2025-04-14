import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import {
    PricingRequest,
    PricingRequestInputDto,
    PricingRequestOutputDto,
    Delivery,
    DeliveryInput,
    DeliveryOutputDto
} from '../types/types';
import { PricingRequestTableSelectSchema, DeliveryTableSelectSchema } from '../db/schema';

// ------------------------------------------------------------------
// Define metadata for nested types (e.g. Address)
// ------------------------------------------------------------------
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

PojosMetadataMap.create<Address>(POJO.ADDRESS, {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
});

// ------------------------------------------------------------------
// API-LEVEL MAPPINGS for Pricing Request
// ------------------------------------------------------------------

// Entity mapping
PojosMetadataMap.create<PricingRequest>(POJO.PRICING_REQUEST, {
    id: String,
    recommendedCategory: String,
    recommendedVehicleSizeCategory: String,
    deliveryAddress: String,
    pickupAddress: String,
    totalFee: Number,
    surcharges: Array,
    distanceCharge: Number,
    weightCharge: Number,
    travelDistance: Number,
    travelTime: Number,
    selectedPickupTime: String,
    expiresAt: String,
    createdAt: String,
    updatedAt: String
});

// Input DTO mapping (uses nested Address objects)
PojosMetadataMap.create<PricingRequestInputDto>(POJO.PRICING_REQUEST_INPUT_DTO, {
    deliveryAddress: String,
    pickupAddress: String
    // pickupAddressFull: POJO.ADDRESS,
    // dropoffAddressFull: POJO.ADDRESS,
    // items: Array,
    // selectedPickupTime: String
});

// Output DTO mapping (same as entity)
PojosMetadataMap.create<PricingRequestOutputDto>(POJO.PRICING_REQUEST_OUTPUT_DTO, {
    id: String,
    recommendedCategory: String,
    recommendedVehicleSizeCategory: String,
    totalFee: Number,
    surcharges: Array,
    distanceCharge: Number,
    weightCharge: Number,
    travelDistance: Number,
    travelTime: Number,
    selectedPickupTime: String,
    expiresAt: String,
    createdAt: String,
    updatedAt: String
});

// DB table mapping for Pricing Request
PojosMetadataMap.create<PricingRequestTableSelectSchema>(POJO.PRICING_REQUEST_TABLE_SCHEMA, {
    id: String,
    recommendedCategory: String,
    recommendedVehicleSizeCategory: String,
    pickupAddress: String,
    deliveryAddress: String,
    totalFee: Number,
    surcharges: Array,
    distanceCharge: Number,
    weightCharge: Number,
    travelDistance: Number,
    travelTime: Number,
    selectedPickupTime: String,
    expiresAt: String,
    createdAt: String,
    updatedAt: String
});

// ------------------------------------------------------------------
// API-LEVEL MAPPINGS for Delivery
// ------------------------------------------------------------------

// Entity mapping
PojosMetadataMap.create<Delivery>(POJO.DELIVERY, {
    id: String,
    driverId: String,
    orderId: String,
    status: String,
    cancellationReason: String,
    cancelledAt: String,
    category: String,
    deliveryNotes: String,
    pickupTime: String,
    travelDistance: Number,
    travelTime: Number,
    eta: Number,
    pickupAddressFull: String,
    dropoffAddressFull: String,
    oversizedAssistanceRequired: Boolean,
    totalFee: Number,
    startedAt: String,
    closedAt: String,
    createdAt: String,
    updatedAt: String
});

// Input DTO mapping
PojosMetadataMap.create<DeliveryInput>(POJO.DELIVERY_INPUT_DTO, {
    driverId: String,
    orderId: String,
    status: String,
    cancellationReason: String,
    cancelledAt: String,
    deliveryNotes: String,
    oversizedAssistanceRequired: Boolean,
    startedAt: String,
    closedAt: String
});

// Output DTO mapping (same as entity)
PojosMetadataMap.create<DeliveryOutputDto>(POJO.DELIVERY_OUTPUT_DTO, {
    id: String,
    driverId: String,
    orderId: String,
    status: String,
    cancellationReason: String,
    cancelledAt: String,
    category: String,
    deliveryNotes: String,
    pickupTime: String,
    travelDistance: Number,
    travelTime: Number,
    eta: Number,
    pickupAddressFull: String,
    dropoffAddressFull: String,
    oversizedAssistanceRequired: Boolean,
    totalFee: Number,
    startedAt: String,
    closedAt: String,
    createdAt: String,
    updatedAt: String
});

// DB table mapping for Delivery
PojosMetadataMap.create<DeliveryTableSelectSchema>(POJO.DELIVERY_TABLE_SCHEMA, {
    id: String,
    driverId: String,
    orderId: String,
    status: String,
    cancellationReason: String,
    cancelledAt: String,
    category: String,
    deliveryNotes: String,
    pickupTime: String,
    travelDistance: Number,
    travelTime: Number,
    eta: Number,
    pickupAddressFull: String,
    dropoffAddressFull: String,
    oversizedAssistanceRequired: Boolean,
    totalFee: Number,
    startedAt: String,
    closedAt: String,
    createdAt: String,
    updatedAt: String
});

// ------------------------------------------------------------------
// Initialize Mapper and Create Mapping Rules
// ------------------------------------------------------------------
export function createMetadataMappings() {}
createMetadataMappings();
export const mapper = createMapper({ strategyInitializer: pojos() });

// Pricing Request mappings
createMap<PricingRequest, PricingRequestOutputDto>(mapper, POJO.PRICING_REQUEST, POJO.PRICING_REQUEST_OUTPUT_DTO);
createMap<PricingRequestInputDto, PricingRequest>(mapper, POJO.PRICING_REQUEST_INPUT_DTO, POJO.PRICING_REQUEST);
createMap<PricingRequestTableSelectSchema, PricingRequest>(
    mapper,
    POJO.PRICING_REQUEST_TABLE_SCHEMA,
    POJO.PRICING_REQUEST
);

// Delivery mappings
createMap<Delivery, DeliveryOutputDto>(mapper, POJO.DELIVERY, POJO.DELIVERY_OUTPUT_DTO);
createMap<DeliveryInput, Delivery>(mapper, POJO.DELIVERY_INPUT_DTO, POJO.DELIVERY);
createMap<DeliveryTableSelectSchema, Delivery>(mapper, POJO.DELIVERY_TABLE_SCHEMA, POJO.DELIVERY);
