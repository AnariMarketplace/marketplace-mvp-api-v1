import { decimal, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';
import { listingServiceSchema } from './schema';

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
    length: decimal(),
    color: varchar()
});
