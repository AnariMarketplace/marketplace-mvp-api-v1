// import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

// import { eq, sql } from 'drizzle-orm';
// import { ApiQueryInputDto, Listing } from '../types/types';
// import { Mapper } from '@automapper/core';
// import { listingsTable, ListingTableSelectSchema } from '../db/schema';
// import { POJO } from '../types/constants';
// import { DATABASE_TABLES } from '@anarimarketplace/constants';

// export class ListingService {
//     constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

//     async create(message: Listing): Promise<Listing> {
//         console.log({ message });
//         const data = await this._dbClient.insert(listingsTable).values(message).returning();

//         return this._mapper.map<ListingTableSelectSchema, Listing>(data[0], POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
//     }

//     async getListings(query: ApiQueryInputDto): Promise<Listing[]> {
//         let sqlStr = `select * from ${DATABASE_TABLES.LISTINGS} WHERE `;
//         Object.keys(query).forEach((key) => {
//             if (query[key]) {
//                 sqlStr += `AND ${key}=${query[key]}`;
//             }
//         });
//         const listings = await this._dbClient.execute(sql`${sqlStr}`);
//         if (!listings) {
//             throw new Error('Listings not found');
//         }
//         return listings.map((data) =>
//             this._mapper.map<ListingTableSelectSchema, Listing>(data, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING)
//         );
//     }
// }

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, like, sql } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { listingsTable, ListingTableSelectSchema } from '../db/schema';
import { ApiQueryInputDto, Listing } from '../types/types';
import { POJO } from '../types/constants';
import { QueryBuilder } from 'drizzle-orm/pg-core';

export class ListingService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(listing: Listing): Promise<Listing> {
        const [insertedRow] = await this._dbClient.insert(listingsTable).values(listing).returning();

        return this._mapper.map(insertedRow, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
    }

    // async getAllByQuery(query: ApiQueryInputDto): Promise<Listing[]> {
    //     const qb = new QueryBuilder();
    //     let sqlQuery = qb.select().from(listingsTable).$dynamic();

    //     if (query.searchTitle) {
    //         if (query.searchMatchMode === 'FUZZY') {
    //             sqlQuery.where(like(listingsTable.title, query.searchTitle));
    //         } else {
    //             sqlQuery.where(eq(listingsTable.title, query.searchTitle));
    //         }
    //     }
    //     const { sql } = sqlQuery.toSQL();
    //     const res = await this._dbClient.execute<Listing>(sql);
    //     if (!res.length) throw new Error(`no listings found matching filters`);

    //     // Map each DB row to your Listing shape
    //     return res.map((row) => this._mapper.map(row, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING));
    // }

    async getAllByQuery(query: ApiQueryInputDto): Promise<Listing[]> {
        // const qb = new QueryBuilder();
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

        // Convert to SQL and get parameters
        // const { sql, params } = sqlQuery.toSQL();

        // Pass both the SQL and the params array to your Postgres client
        const res = await sqlQuery;

        if (!res.length) {
            throw new Error(`no listings found matching filters`);
        }

        // Map each DB row to your Listing shape
        return res.map((row) => this._mapper.map(row, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING));
    }
}
