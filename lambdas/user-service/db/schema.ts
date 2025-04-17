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

export const userSchema = pgSchema('user_service');

export const sellersTable = userSchema.table('sellers', {
    id: uuid('id').defaultRandom().primaryKey(),
    pageName: varchar('page_name')
});

export const sellersScheduleTable = userSchema.table('sellers_schedule', {
    day: integer(),
    startTime: varchar('start_time'),
    endTime: varchar('end_time')
});

export const driversTable = userSchema.table('drivers', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    authId: varchar('auth_id')
});

export const driverRealtimeMetadataTable = userSchema.table('driver_realtime_metadata', {
    driverId: uuid('driver_id'),
    isOnShift: boolean('is_on_shift'),
    lastActiveAt: timestamp('last_active_at'),
    lastLat: doublePrecision('last_lat'),
    lastLng: doublePrecision('last_lng'),
    locationLastUpdatedAt: timestamp('location_last_updated_at'),
    isOnDelivery: boolean('is_on_delivery')
});

export type DriverTableSelectSchema = typeof driversTable.$inferSelect;
export type DriverRealtimeMetadataTableSelectSchema = typeof driverRealtimeMetadataTable.$inferSelect;
