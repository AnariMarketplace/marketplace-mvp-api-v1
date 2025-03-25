import { DATABASE_TABLES } from '@anarimarketplace/constants';
import { decimal, integer, pgSchema, pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgSchema('user_service');

export const listingsTable = userSchema.table('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    authSystemId: varchar('auth_system_id')
});

export const sellersTable = userSchema.table('sellers', {
    id: uuid('id').defaultRandom().primaryKey(),
    pageName: varchar('page_name')
});

export const sellersScheduleTable = userSchema.table('sellers_schedule', {
    day: integer(),
    startTime: varchar('start_time'),
    endTime: varchar('end_time')
});

export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;
