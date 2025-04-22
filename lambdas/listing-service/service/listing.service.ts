import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, like } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { listingsTable } from '../db/schema';
import { ApiQueryInputDto, Listing } from '../types/types';

export class ListingService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(listing: Listing): Promise<Listing> {
        const [insertedRow] = await this._dbClient.insert(listingsTable).values(listing).returning();
        return insertedRow;
    }

    async getById(id: string): Promise<Listing> {
        const [listing] = await this._dbClient.select().from(listingsTable).where(eq(listingsTable.id, id));
        return listing;
    }

    async getAllByQuery(query: ApiQueryInputDto): Promise<Listing[]> {
        let sqlQuery = this._dbClient.select().from(listingsTable).where(eq(listingsTable.condition, 'NEW')).$dynamic();
        console.log(query);
        if (query.searchTitle) {
            if (query.searchMatchMode === 'FUZZY') {
                // e.g. partial match
                sqlQuery.where(like(listingsTable.title, `%${query.searchTitle}%`));
            } else {
                // strict match
                sqlQuery.where(eq(listingsTable.title, query.searchTitle));
            }
        }

        // Pass both the SQL and the params array to your Postgres client
        const res = await sqlQuery;

        if (!res.length) {
            throw new Error(`no listings found matching filters`);
        }

        // Map each DB row to your Listing shape
        // return res.map((row) => this._mapper.map(row, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING));
        return res;
    }

    async getListingOrderContextByListingIds(listingIds: string): Promise<Partial<Listing>> {
        console.log('listingIds', listingIds);
        const res = await this._dbClient
            .select({
                sellerId: listingsTable.sellerId,
                listingId: listingsTable.id,
                weight: listingsTable.weight,
                height: listingsTable.height,
                width: listingsTable.width,
                length: listingsTable.length
            })
            .from(listingsTable)
            .where(eq(listingsTable.id, listingIds))
            .limit(1);

        console.log('res', res);
        return res as unknown as Listing;
    }
}
