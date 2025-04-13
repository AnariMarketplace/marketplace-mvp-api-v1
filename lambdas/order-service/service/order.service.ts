import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { eq } from 'drizzle-orm';
import { Checkout } from '../types/types';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import Stripe from 'stripe';
import { checkoutRequestTable } from '../db/schema';

export class OrderService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(checkout: Checkout): Promise<Checkout> {
        const [insertedRow] = await this._dbClient.insert(checkoutRequestTable).values(checkout).returning();

        return this._mapper.map(insertedRow, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }
}
