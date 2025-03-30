import { z } from 'zod';
import { listingsTable } from '../db/schema';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { SNSClient } from '@aws-sdk/client-sns';

export type ListingInputDto = z.infer<typeof ListingInputValidationSchema>;
export type ApiQueryInputDto = z.infer<typeof ApiQueryValidationSchema>;
export type Listing = typeof listingsTable.$inferInsert & {};

export const ListingInputValidationSchema = z.object({
    title: z.string(),
    sellerId: z.string().uuid(),
    purchaseType: z.enum(['BUY', 'RENT']).optional(),
    price: z.number()
});

export interface ListingOutputDto {
    id: string;
    title: string;
    sellerId: string;
    purchaseType: string;
    price: number;
}

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    path: string;
    handler: (event: APIGatewayProxyEvent, service: any, snsClient: SNSClient) => Promise<APIGatewayProxyResult>;
}

export const ApiQueryValidationSchema = z.object({
    searchTitle: z.string().optional(),
    searchMatchMode: z.enum(['FUZZY', 'STRICT']).optional().default('STRICT'),
    condition: z.enum(['NEW', 'GREAT', 'FAIR', 'POOR']).optional(),
    proximityMiles: z.enum(['lt_25', 'mt_25']).default('lt_25')
});
