import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { eq } from 'drizzle-orm';
import { Listing } from '../types/types';
import { Mapper } from '@automapper/core';
import { listingsTable, ListingTableSelectSchema } from '../db/schema';
import { POJO } from '../types/constants';

export class ListingService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(message: Listing): Promise<Listing> {
        console.log({ message });
        const data = await this._dbClient.insert(listingsTable).values(message).returning();

        return this._mapper.map<ListingTableSelectSchema, Listing>(data[0], POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
    }

    // async getAllByProximity(): Promise<Listing[]> {
    //     const msg = await this._dbClient.select().from(listingsTable);
    //     return msg.map((ms) =>
    //         this._mapper.map<MessageTableSelectSchema, Message>(
    //             ms,
    //             MESSAGE_POJO.MESSAGE_TABLE_SCHEMA,
    //             MESSAGE_POJO.MESSAGE
    //         )
    //     );
    // }

    // async getMessage(id: string): Promise<Message[]> {
    //     console.log('called for id:', id);
    //     const msg = await this._dbClient.select().from(messagesTable).where(eq(messagesTable.id, id));
    //     if (!msg) {
    //         throw new Error();
    //     }
    //     return msg.map((ms) =>
    //         this._mapper.map<MessageTableSelectSchema, Message>(
    //             ms,
    //             MESSAGE_POJO.MESSAGE_TABLE_SCHEMA,
    //             MESSAGE_POJO.MESSAGE
    //         )
    //     );
    // }

    // async processWebhookMessage(message: Message): Promise<Message> {
    //     console.log('WEBHOOK SERVICE TRIGGERED');
    //     console.log({ message });
    //     return message;
    // }
}
