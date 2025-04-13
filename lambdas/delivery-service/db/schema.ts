import { pgTable, uuid, text, timestamp, integer, boolean, decimal, json, pgSchema, varchar } from 'drizzle-orm/pg-core';

export const deliveryServiceSchema = pgSchema('delivery_service');
export const recommendedCategoryEnum = deliveryServiceSchema.enum('recommended_category', ['BASE', 'XL']);
export const recommendedVehicleSizeCategoryEnum = deliveryServiceSchema.enum('recommended_vehicle_size_category', [
    'SMALL',
    'MED',
    'LARGE'
]);

export const pricingRequestsTable = deliveryServiceSchema.table('pricing_requests', {
    id: uuid('id').primaryKey(),
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

export const deliveryStatusEnum = deliveryServiceSchema.enum('status', [
    'AWAITING_PICKUP',
    'IN_TRANSIT',
    'DELIVERED',
    'ORDER_CANCELLED',
    'DRIVER_CANCELLED'
]);
export const deliveryCategoryEnum = deliveryServiceSchema.enum('category', ['BASE', 'XL']);

export const deliveriesTable = deliveryServiceSchema.table('deliveries', {
    id: uuid('id').primaryKey(),
    driverId: uuid('driver_id'), // FK; will be null until driver is found
    orderId: uuid('order_id'),
    status: deliveryStatusEnum('status'),
    cancellationReason: text('cancellation_reason'),
    cancelledAt: timestamp('cancelled_at'),
    category: deliveryCategoryEnum('category'),
    deliveryNotes: text('delivery_notes'),
    pickupTime: text('pickup_time'),
    travelDistance: integer('travel_distance'),
    travelTime: integer('travel_time'),
    eta: integer('eta'),
    pickupAddressFull: json('pickup_address_full'),
    dropoffAddressFull: json('dropoff_address_full'),
    oversizedAssistanceRequired: boolean('oversized_assistance_required'),
    totalFee: decimal('total_fee'), // The driver's payout amount
    startedAt: timestamp('started_at'),
    closedAt: timestamp('closed_at'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
});

export type DeliveryTableSelectSchema = typeof deliveriesTable.$inferSelect;
export type PricingRequestTableSelectSchema = typeof pricingRequestsTable.$inferSelect;
