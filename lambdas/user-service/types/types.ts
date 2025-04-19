import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { driverRealtimeMetadataTable, driversTable, sellersTable } from '../db/schema';

export interface DriverOutputDto extends Driver {}

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any, authClient?: any) => Promise<APIGatewayProxyResult>;
}

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
