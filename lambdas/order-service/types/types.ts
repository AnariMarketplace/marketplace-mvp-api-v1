import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { checkoutRequestTable } from '../db/schema';

export type CheckoutInputDto = z.infer<typeof CheckoutInputValidationSchema>;
export type Checkout = typeof checkoutRequestTable.$inferInsert & {};

// export type Listing = typeof listingsTable.$inferInsert & {};
export const CheckoutInputValidationSchema = z.object({
    deliveryAddress: z.string()
})

export interface CheckoutOutputDto {
    id: string,
    deliveryDetails: {
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
    }[],
    subtotal: number
}

// export type ListingMetadata = z.infer<typeof ListingMetadataInputValidationSchema>;

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any) => Promise<APIGatewayProxyResult>;
}
