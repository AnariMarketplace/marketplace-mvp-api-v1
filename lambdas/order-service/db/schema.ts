import {
    decimal,
    jsonb,
    numeric,
    pgSchema,
    pgTable,
    pgTable as table,
    timestamp,
    uuid,
    varchar
} from 'drizzle-orm/pg-core';
import { DATABASE_TABLES } from '../types/constants';
import { sql } from 'drizzle-orm';
import { string } from 'zod';

export const orderSchema = pgSchema('order_service');

export const checkoutRequestTable = orderSchema.table('checkout', {
    id: uuid('id').defaultRandom().primaryKey(),
    deliveryPricingRequestId: uuid('delivery_pricing_request_id'),
    subtotal: numeric('delivery_fee', { precision: 10, scale: 2 }),
    deliveryAddress: varchar('delivery_address'),
    pickupAddress: varchar('pickup_address')
    // userId: uuid('user_id'),
    // lineItems: jsonb('line_items').notNull(),
    // subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
    // taxAmount: numeric('tax_amount', { precision: 10, scale: 2 }).notNull(),
    // shippingMethod: varchar('shipping_method', { length: 50 }),
    // deliveryFee: numeric('delivery_fee', { precision: 10, scale: 2 }),
    // discountCode: varchar('discount_code', { length: 50 }),
    // discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }),
    // totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
    // status: varchar('status', { length: 20 }).default('PENDING').notNull(),
    // createdAt: timestamp('created_at')
    //     .default(sql`NOW()`)
    //     .notNull(),
    // expiresAt: timestamp('expires_at').default(sql`NOW() + INTERVAL '1 hour'`)
});

export const ordersTable = orderSchema.table('orders', {
    // id: ,
    status: varchar(),
    checkoutRequestId: uuid(),
    total: decimal()
});

export type CheckoutRequestTableSelectSchema = typeof checkoutRequestTable.$inferSelect;
export type OrdersTableSelectSchema = typeof ordersTable.$inferSelect;
