import { decimal, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';
import { DATABASE_TABLES } from '../types/constants';

export const listingsTable = table(DATABASE_TABLES.LISTINGS, {
    providerPaymentId: varchar(),
    paymentMethod: varchar(),
    id: uuid('id').defaultRandom(),
    price: decimal().notNull()
});

export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;
