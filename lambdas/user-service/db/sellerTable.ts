import {
    boolean,
    doublePrecision,
    integer,
    pgSchema,
    pgTable as table,
    text,
    timestamp,
    uuid,
    varchar
} from 'drizzle-orm/pg-core';
import { userSchema } from './schema';
import { usersTable } from './userTable';
export const sellersTable = userSchema.table('sellers', {
    id: uuid('id').defaultRandom().primaryKey(),
    pageName: varchar('page_name'),
    pickupAddress: text('pickup_address'),
    userId: uuid('user_id')
        .references(() => usersTable.id)
        .notNull()
        .unique()
});

export const sellersScheduleTable = userSchema.table('sellers_schedule', {
    day: integer(),
    startTime: varchar('start_time'),
    endTime: varchar('end_time')
});
