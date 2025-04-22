import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { eq } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { CheckoutSession } from '../types/types';
import { checkoutSessionTable } from '../db/checkoutSessionTable';

export class CheckoutSessionService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async createCheckoutSessions(checkout: CheckoutSession): Promise<CheckoutSession> {
        const [insertedRow] = await this._dbClient.insert(checkoutSessionTable).values(checkout).returning();
        return this._mapper.map(insertedRow, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }

    async getCheckoutSessionById(id: string): Promise<CheckoutSession> {
        const [checkout] = await this._dbClient
            .select()
            .from(checkoutSessionTable)
            .where(eq(checkoutSessionTable.id, id))
            .limit(1);
        return this._mapper.map(checkout, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }
    // async getCheckoutSessionByCustomerId(customerId: string): Promise<CheckoutSession> {
    //     const [checkout] = await this._dbClient.select().from(checkoutSessionTable).where(and(eq(checkoutSessionTable.customerId, customerId), eq(checkoutSessionTable.status, 'pending'))).limit(1);
    //     return this._mapper.map(checkout, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    // }
    async updateCheckoutSession(checkout: CheckoutSession): Promise<CheckoutSession> {
        const [updatedRow] = await this._dbClient
            .update(checkoutSessionTable)
            .set(checkout)
            .where(eq(checkoutSessionTable.id, checkout.id!))
            .returning();
        return this._mapper.map(updatedRow, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }
}
