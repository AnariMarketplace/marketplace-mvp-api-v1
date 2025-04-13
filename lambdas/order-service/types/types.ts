import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { checkoutRequestTable } from '../db/schema';

export type CheckoutInputDto = z.infer<typeof CheckoutInputValidationSchema>;
export type Checkout = typeof checkoutRequestTable.$inferInsert & {};

// export type Listing = typeof listingsTable.$inferInsert & {};
export const CheckoutInputValidationSchema = z.object({
    deliveryAddress: z.string(),
    pickupAddress: z.string()
    //[] items
})

export interface CheckoutOutputDto {
    id: string,
    deliveryDetails: DeliveryDetails,
    subtotal: number
}

export interface DeliveryDetails {
    recommendedCategory: string,
    recommendedVehicleSizeCategory: string,
    totalFee: number,
    surcharges: any[],
    distanceCharged: number,
    weightCharge: number,
    travelDistance: number,
    travelTime: number,
    selectedPickupTime: string,
    expitesAt: string,
    createdAt: string, 
    updatedAt: string,
}

// export type ListingMetadata = z.infer<typeof ListingMetadataInputValidationSchema>;

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any) => Promise<APIGatewayProxyResult>;
}
