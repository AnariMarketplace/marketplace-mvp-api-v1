import { PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import {
    PricingRequest,
    PricingRequestInputDto,
    PricingRequestOutputDto,
    PricingRequestTableSelectSchema
} from '../types/types';

// Entity mapping
export function loadPricingRequestMappings() {
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

    PojosMetadataMap.create<PricingRequestInputDto>(POJO.PRICING_REQUEST_INPUT_DTO, {
        deliveryAddress: String,
        pickupAddress: String
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
}
