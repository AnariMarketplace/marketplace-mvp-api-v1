import { decimal, integer, json, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { deliveryServiceSchema } from './schema';
import { recommendedCategoryEnum, recommendedVehicleSizeCategoryEnum } from './enums';

export const pricingRequestsTable = deliveryServiceSchema.table('pricing_requests', {
    id: uuid('id').defaultRandom().primaryKey(),
    recommendedCategory: recommendedCategoryEnum('recommended_category'),
    recommendedVehicleSizeCategory: recommendedVehicleSizeCategoryEnum('recommended_vehicle_size_category'),
    // pickupAddressFull: json('pickup_address_full'),
    // dropoffAddressFull: json('dropoff_address_full'),
    pickupAddress: varchar('pickup_address'),
    deliveryAddress: varchar('delivery_address'),
    totalFee: decimal('total_fee').$type<number>(),
    surcharges: json('surcharges').array(), // Array of JSON objects like {reason, fee}
    distanceCharge: decimal('distance_charge'),
    weightCharge: decimal('weight_charge'),
    travelDistance: integer('travel_distance'),
    travelTime: integer('travel_time'),
    selectedPickupTime: text('selected_pickup_time'),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
});
