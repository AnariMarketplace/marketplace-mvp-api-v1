import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    boolean,
    decimal,
    json,
    pgSchema,
    varchar
} from 'drizzle-orm/pg-core';

export const deliveryServiceSchema = pgSchema('delivery_service');
