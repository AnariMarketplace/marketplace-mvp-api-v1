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

export const sellersTable = userSchema.table('sellers', {
    id: uuid('id').defaultRandom().primaryKey(),
    pageName: varchar('page_name'),
    pickupAddress: text('pickup_address')
});

export const sellersScheduleTable = userSchema.table('sellers_schedule', {
    day: integer(),
    startTime: varchar('start_time'),
    endTime: varchar('end_time')
});
