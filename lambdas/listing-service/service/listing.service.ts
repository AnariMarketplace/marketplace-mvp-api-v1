import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, inArray, like, sql } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { listingsTable, ListingTableSelectSchema } from '../db/schema';
import { ApiQueryInputDto, Listing } from '../types/types';
import { POJO } from '../types/constants';

export class ListingService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(listing: Listing): Promise<Listing> {
        const [insertedRow] = await this._dbClient.insert(listingsTable).values(listing).returning();

        return this._mapper.map(insertedRow, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
    }

    async getById(id: string): Promise<Listing> {
        const [listing] = await this._dbClient.select().from(listingsTable).where(eq(listingsTable.id, id));

        return this._mapper.map(listing, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
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
        return res.map((row) => this._mapper.map(row, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING));
    }

    async getListingOrderContextByListingIds(listingIds: string) {
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
        return res;
    }
}
