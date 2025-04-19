import { DATABASE_TABLES } from '@anarimarketplace/constants';
import { decimal, pgSchema, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';

export const listingServiceSchema = pgSchema('listing_service');
export const listingsTable = listingServiceSchema.table('listings', {
    title: varchar().notNull(),
    sellerId: uuid('seller_id').notNull(),
    purchaseType: varchar('purchase_type').default('SALE'),
    id: uuid('id').defaultRandom().primaryKey(),
    price: decimal().notNull(),
    condition: varchar(),
    brand: varchar().default(''),
    weight: decimal(),
    height: decimal(),
    width: decimal(),
    length: decimal()
});

export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;
