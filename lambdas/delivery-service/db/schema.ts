import { DATABASE_TABLES } from '@anarimarketplace/constants';
import { decimal, pgSchema, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
export const deliverySchema = pgSchema('delivery_service');
export const listingsTable = deliverySchema.table('deliveries', {
    title: varchar().notNull(),
    sellerId: uuid('seller_id').notNull(),
    purchaseType: varchar('purchase_type').default('SALE'),
    id: uuid('id').defaultRandom().primaryKey(),
    price: decimal().notNull(),
    condition: varchar()
});

export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;
