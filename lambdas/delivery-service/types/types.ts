import { z } from 'zod';
import { deliveriesTable } from '../db/deliveryTable';
import { pricingRequestsTable } from '../db/pricingRequestTable';

export const PricingRequestInputValidationSchema = z.object({
    deliveryAddress: z.string(),
    pickupAddress: z.string(),
    items: z.array(
        z.object({
            weight: z.number(),
            height: z.number(),
            width: z.number(),
            length: z.number()
        })
    )
});

export interface Delivery {
    id: string;
    driverId?: string;
    orderId?: string;
    status: 'AWAITING_PICKUP' | 'IN_TRANSIT' | 'DELIVERED' | 'ORDER_CANCELLED' | 'DRIVER_CANCELLED';
    cancellationReason?: string;
    cancelledAt?: string;
    category: 'BASE' | 'XL';
    deliveryNotes?: string;
    pickupTime?: string;
    travelDistance?: number;
    travelTime?: number;
    eta?: number;
    pickupAddressFull?: string;
    dropoffAddressFull?: string;
    oversizedAssistanceRequired?: boolean;
    totalFee?: number;
    startedAt?: string;
    closedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface DeliveryInput {
    driverId: string;
    orderId: string;
    status: 'AWAITING_PICKUP' | 'IN_TRANSIT' | 'DELIVERED' | 'ORDER_CANCELLED' | 'DRIVER_CANCELLED';
    cancellationReason?: string;
    cancelledAt?: string;
    deliveryNotes?: string;
    oversizedAssistanceRequired?: boolean;
    startedAt?: string;
    closedAt?: string;
}

export interface DeliveryOutputDto extends Delivery {}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export type PricingRequestInputDto = z.infer<typeof PricingRequestInputValidationSchema>;
export type PricingRequest = typeof pricingRequestsTable.$inferInsert & {};
export interface PricingRequestOutputDto extends PricingRequest {}

export type DeliveryTableSelectSchema = typeof deliveriesTable.$inferSelect;
export type PricingRequestTableSelectSchema = typeof pricingRequestsTable.$inferSelect;
