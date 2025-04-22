import { PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { Delivery, DeliveryInput, DeliveryOutputDto, Address, DeliveryTableSelectSchema } from '../types/types';

export function loadDeliveryMappings() {
    PojosMetadataMap.create<Address>(POJO.ADDRESS, {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    });

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
}
