import { z } from 'zod';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

// export type ListingInputDto = z.infer<typeof ListingInputValidationSchema>;

// export type Listing = typeof listingsTable.$inferInsert & {};

// export const ListingInputValidationSchema = z.object({
//     title: z.string(),
//     sellerId: z.string().uuid(),
//     purchaseType: z.enum(['BUY', 'RENT']).optional(),
//     price: z.number()
//     // metadata: ListingMetadataInputValidationSchema
// });

// export interface PaymentIntentOutputDto {
//     paymentIntent: string;
//     ephemeralKey: string;
//     customerId: string;
//     publishableKey: string;
// }

// export type ListingMetadata = z.infer<typeof ListingMetadataInputValidationSchema>;

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any) => Promise<APIGatewayProxyResult>;
}
