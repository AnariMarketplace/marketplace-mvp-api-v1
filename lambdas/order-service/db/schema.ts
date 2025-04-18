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
    listingIds: jsonb('listing_ids').notNull(),
    customerInfo: jsonb('customer_info').notNull(),
    deliveryPricingRequestId: uuid('delivery_pricing_request_id').notNull(),
    subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
    deliveryAddress: varchar('delivery_address', { length: 255 }).notNull(),
    pickupAddress: varchar('pickup_address', { length: 255 }).notNull(),
    pickupTime: timestamp('pickup_time').notNull(),
    orderNotes: text('order_notes').notNull().default(''),
    createdAt: timestamp('created_at').notNull().default(sql`now()`),
    updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
  });

export const ordersTable = orderSchema.table('orders', {
    // id: ,
    status: varchar(),
    checkoutRequestId: uuid(),
    total: decimal()
});

export type CheckoutSessionTableSelectSchema = typeof checkoutSessionTable.$inferSelect;
export type OrdersTableSelectSchema = typeof ordersTable.$inferSelect;
