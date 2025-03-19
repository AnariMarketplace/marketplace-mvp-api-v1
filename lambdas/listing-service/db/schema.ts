import { decimal, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';
import { DATABASE_TABLES } from '../types/constants';

export const listingsTable = table(DATABASE_TABLES.LISTINGS, {
    title: varchar().notNull(),
    sellerId: uuid().notNull(),
    purchaseType: varchar().default('SALE'),
    id: uuid('id').defaultRandom(),
    price: decimal().notNull()
});

export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;
