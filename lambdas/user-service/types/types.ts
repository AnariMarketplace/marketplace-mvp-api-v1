import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { driverRealtimeMetadataTable, driversTable, sellersTable } from '../db';

export interface DriverOutputDto extends Driver {}

export const DriverRealtimeMetadataInputSchema = z.object({
    isOnShift: z.boolean().optional(),
    lastActiveAt: z.string().optional(),
    lastLat: z.number().optional(),
    lastLng: z.number().optional(),
    isOnDelivery: z.boolean().optional(),
    driverId: z.string().uuid()
});

export type VehicleInfo = {
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
};

export type Driver = typeof driversTable.$inferSelect;
export type DriverRealtimeMetadata = typeof driverRealtimeMetadataTable.$inferSelect;
export type Seller = typeof sellersTable.$inferSelect;
export type DriverTableSelectSchema = typeof driversTable.$inferSelect;
export type DriverRealtimeMetadataTableSelectSchema = typeof driverRealtimeMetadataTable.$inferSelect;
