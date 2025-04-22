import { decimal, uuid, varchar } from 'drizzle-orm/pg-core';
import { orderSchema } from './schema';

export const ordersTable = orderSchema.table('orders', {
    id: uuid('id').defaultRandom().primaryKey(),
    status: varchar(),
    checkoutRequestId: uuid(),
    total: decimal()
});
