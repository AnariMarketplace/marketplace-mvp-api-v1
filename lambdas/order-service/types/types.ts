import { z } from 'zod';
import { ordersTable } from '../db/orderTable';
import { checkoutSessionTable } from '../db/checkoutSessionTable';

export type CheckoutSessionInputDto = z.infer<typeof CheckoutSessionSummaryInputValidationSchema>;
export type CheckoutSession = typeof checkoutSessionTable.$inferInsert & {
    deliveryDetails?: DeliveryDetails;
};

// export type Listing = typeof listingsTable.$inferInsert & {};
export const CheckoutSessionSummaryInputValidationSchema = z.object({
    id: z.string().uuid(),
    deliveryAddress: z.string(),
    orderNotes: z.string(),
    pickupTime: z.string()
});

export interface CheckoutOutputDto {
    id: string;
    deliveryDetails: DeliveryDetails;
    subtotal: number;
    listings: any[];
}

export interface DeliveryDetails {
    recommendedCategory: string;
    recommendedVehicleSizeCategory?: string;
}

export interface DeliveryDetails {
    recommendedCategory: string;
    recommendedVehicleSizeCategory?: string;
    totalFee: number;
    surcharges: any[];
    distanceCharged: number;
    weightCharge: number;
    travelDistance?: number;
    travelTime: number;
    selectedPickupTime: string;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

// export type ListingMetadata = z.infer<typeof ListingMetadataInputValidationSchema>;
export type CheckoutSessionTableSelectSchema = typeof checkoutSessionTable.$inferSelect;
export type OrdersTableSelectSchema = typeof ordersTable.$inferSelect;
