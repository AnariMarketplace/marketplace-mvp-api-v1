// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { z } from 'zod';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// // ---------------------
// // Shared Schemas
// // ---------------------

// // Address used in PricingRequestInput
// export const AddressSchema = z.object({
//     street: z.string(),
//     city: z.string(),
//     state: z.string(),
//     postalCode: z.string(),
//     country: z.string()
// });
// export type Address = z.infer<typeof AddressSchema>;

// // Item used in PricingRequestInput (for additional details)
// export const PricingRequestItemSchema = z.object({
//     title: z.string(),
//     baseWeight: z.number().int(),
//     height: z.number(),
//     width: z.number(),
//     length: z.number()
// });
// export type PricingRequestItem = z.infer<typeof PricingRequestItemSchema>;

// // ---------------------
// // Pricing Request Schemas
// // ---------------------

// export const PricingRequestValidationSchema = z.object({
//     id: z.string().uuid(),
//     recommendedCategory: z.enum(['BASE', 'XL']),
//     // Note: the API spec uses "recommendedVehicleSizeCategory"
//     recommendedVehicleSizeCategory: z.enum(['SMALL', 'MED', 'LARGE']),
//     totalFee: z.number(),
//     surcharges: z
//         .array(
//             z.object({
//                 reason: z.string(),
//                 fee: z.number()
//             })
//         )
//         .optional(),
//     distanceCharge: z.number().optional(),
//     weightCharge: z.number().optional(),
//     travelDistance: z.number().int().optional(),
//     travelTime: z.number().int().optional(),
//     selectedPickupTime: z.string().optional(),
//     expiresAt: z.string().datetime().optional(),
//     createdAt: z.string().datetime(),
//     updatedAt: z.string().datetime()
// });
// export type PricingRequest = z.infer<typeof PricingRequestValidationSchema>;

// export const PricingRequestInputValidationSchema = z.object({
//     pickupAddressFull: AddressSchema,
//     dropoffAddressFull: AddressSchema,
//     items: z.array(PricingRequestItemSchema),
//     selectedPickupTime: z.string().optional()
// });
// export type PricingRequestInput = z.infer<typeof PricingRequestInputValidationSchema>;

// // ---------------------
// // Delivery Schemas
// // ---------------------

// export const DeliveryValidationSchema = z.object({
//     id: z.string().uuid(),
//     driverId: z.string().uuid().optional(),
//     orderId: z.string().uuid().optional(),
//     status: z.enum(['AWAITING_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'ORDER_CANCELLED', 'DRIVER_CANCELLED']),
//     cancellationReason: z.string().optional(),
//     cancelledAt: z.string().datetime().optional(),
//     category: z.enum(['BASE', 'XL']),
//     deliveryNotes: z.string().optional(),
//     pickupTime: z.string().optional(),
//     travelDistance: z.number().int().optional(),
//     travelTime: z.number().int().optional(),
//     eta: z.number().int().optional(),
//     pickupAddressFull: z.string().optional(),
//     dropoffAddressFull: z.string().optional(),
//     oversizedAssistanceRequired: z.boolean().optional(),
//     totalFee: z.number().optional(),
//     startedAt: z.string().datetime().optional(),
//     closedAt: z.string().datetime().optional(),
//     createdAt: z.string().datetime(),
//     updatedAt: z.string().datetime()
// });
// export type Delivery = z.infer<typeof DeliveryValidationSchema>;

// export const DeliveryInputValidationSchema = z.object({
//     driverId: z.string().uuid(),
//     orderId: z.string().uuid(),
//     status: z.enum(['AWAITING_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'ORDER_CANCELLED', 'DRIVER_CANCELLED']),
//     cancellationReason: z.string().optional(),
//     cancelledAt: z.string().datetime().optional(),
//     deliveryNotes: z.string().optional(),
//     oversizedAssistanceRequired: z.boolean().optional(),
//     startedAt: z.string().datetime().optional(),
//     closedAt: z.string().datetime().optional()
// });
// export type DeliveryInput = z.infer<typeof DeliveryInputValidationSchema>;

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any) => Promise<APIGatewayProxyResult>;
}

// Shared address type (used in input DTOs)
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// Pricing Request
export interface PricingRequest {
    id: string;
    recommendedCategory: 'BASE' | 'XL';
    recommendedVehicleSizeCategory: 'SMALL' | 'MED' | 'LARGE';
    totalFee: number;
    surcharges?: { reason: string; fee: number }[];
    distanceCharge?: number;
    weightCharge?: number;
    travelDistance?: number;
    travelTime?: number;
    selectedPickupTime?: string;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PricingRequestInput {
    pickupAddressFull: Address;
    dropoffAddressFull: Address;
    items: { title: string; baseWeight: number; height: number; width: number; length: number }[];
    selectedPickupTime?: string;
}

export interface PricingRequestOutputDto extends PricingRequest {}

// Delivery
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
