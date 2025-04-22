import { boolean, decimal, integer, json, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { deliveryServiceSchema } from './schema';
import { deliveryCategoryEnum, deliveryStatusEnum } from './enums';

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
