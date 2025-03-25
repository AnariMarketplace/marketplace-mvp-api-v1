import { decimal, pgSchema, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';
import { DATABASE_TABLES } from '../types/constants';
export const paymentSchema = pgSchema('payment_service');

export const transactionTable = paymentSchema.table('transactions', {
    paymentSystemTransactionId: varchar('payment_system_transaction_id'),
    paymentMethod: varchar('payment_method'),
    id: uuid('id').defaultRandom(),
    amount: decimal('amount').notNull(),
    currency: varchar('currency').default('USD'),
    status: varchar('status'),
    customerId: varchar('customer_id'),
    listingId: varchar('listing_id')
});

export type TransactionTableSelectSchema = typeof transactionTable.$inferSelect;
