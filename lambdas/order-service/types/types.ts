import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { checkoutSessionTable } from '../db/schema';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
export type CheckoutSessionInputDto = z.infer<typeof CheckoutInputValidationSchema>;
export type CheckoutSession = typeof checkoutSessionTable.$inferInsert & {};

// export type Listing = typeof listingsTable.$inferInsert & {};
export const CheckoutInputValidationSchema = z.object({
    deliveryAddress: z.string(),
    listingIds: z.array(z.string()),
    customerId: z.string(),
    orderNotes: z.string(),
    pickupTime: z.string()
});

export interface CheckoutOutputDto {
    id: string;
    deliveryDetails: DeliveryDetails;
    subtotal: number;
}

export interface DeliveryDetails {
    recommendedCategory: string;
    recommendedVehicleSizeCategory: string;
}

export interface DeliveryDetails {
    recommendedCategory: string;
    recommendedVehicleSizeCategory: string;
    totalFee: number;
    surcharges: any[];
    distanceCharged: number;
    weightCharge: number;
    travelDistance: number;
    travelTime: number;
    selectedPickupTime: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

// export type ListingMetadata = z.infer<typeof ListingMetadataInputValidationSchema>;

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (
        event: APIGatewayProxyEvent,
        service: any,
        authClient: ServerAuthClient
    ) => Promise<APIGatewayProxyResult>;
}
