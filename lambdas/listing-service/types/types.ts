import { z } from 'zod';
import { listingsTable } from '../db';

export type ListingInputDto = z.infer<typeof ListingInputValidationSchema>;
export type ApiQueryInputDto = z.infer<typeof ApiQueryValidationSchema>;
export type Listing = typeof listingsTable.$inferInsert & {};
// export type ListingTableSelectSchema = typeof listingsTable.$inferSelect;

export const ListingInputValidationSchema = z.object({
    title: z.string(),
    sellerId: z.string().uuid(),
    purchaseType: z.enum(['BUY', 'RENTAL']).optional(),
    price: z.number(),
    brand: z.string().optional(),
    description: z.string().optional(),
    condition: z.enum(['NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR']).optional(),
    images: z.array(z.string()).optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    depth: z.number().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    category: z.enum(['ELECTRONICS', 'FURNITURE', 'HOME', 'OUTDOOR', 'TOYS', 'OTHER']).optional()
});

export interface ListingOutputDto {
    id: string;
    title: string;
    sellerId: string;
    purchaseType: string;
    price: number;
    brand: string;
    description: string;
    condition: string;
    height: number;
    width: number;
    depth: number;
    weight: number;
    length: number;
    category: string;
    photos: string[];
    createdAt: string;
    updatedAt: string;
}

export const listingProps = {
    id: String,
    title: String,
    price: Number,
    purchaseType: String,
    sellerId: String,
    brand: String,
    description: String,
    condition: String,
    height: Number,
    width: Number,
    depth: Number,
    weight: Number,
    length: Number,
    category: String
};

export const ApiQueryValidationSchema = z.object({
    searchTitle: z.string().optional(),
    searchMatchMode: z.enum(['FUZZY', 'STRICT']).optional().default('STRICT'),
    condition: z.enum(['NEW', 'GREAT', 'FAIR', 'POOR']).optional(),
    proximityMiles: z.enum(['lt_25', 'mt_25']).default('lt_25')
});
