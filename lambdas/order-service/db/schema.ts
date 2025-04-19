import {
    decimal,
    jsonb,
    numeric,
    pgSchema,
    pgTable,
    pgTable as table,
    text,
    timestamp,
    uuid,
    varchar
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const orderSchema = pgSchema('order_service');
export const checkoutSessionTable = orderSchema.table('checkout_session', {
    id: uuid('id').defaultRandom().primaryKey(),
    listingIds: jsonb('listing_ids'),
    customerId: uuid('customer_id'),
    deliveryPricingRequestId: uuid('delivery_pricing_request_id'),
    subtotal: numeric('subtotal', { precision: 10, scale: 2 }),
    deliveryAddress: varchar('delivery_address', { length: 255 }),
    pickupAddress: varchar('pickup_address', { length: 255 }),
    pickupTime: timestamp('pickup_time'),
    orderNotes: text('order_notes').default(''),
    createdAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at').default(sql`now()`)
});

export const ordersTable = orderSchema.table('orders', {
    // id: ,
    status: varchar(),
    checkoutRequestId: uuid(),
    total: decimal()
});

export type CheckoutSessionTableSelectSchema = typeof checkoutSessionTable.$inferSelect;
export type OrdersTableSelectSchema = typeof ordersTable.$inferSelect;
