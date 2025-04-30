import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { eq } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { CheckoutSession } from '../types/types';
import { checkoutSessionTable } from '../db/checkoutSessionTable';
export class OrderService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async createCheckoutSession(checkout: CheckoutSession): Promise<CheckoutSession> {
        const [insertedRow] = await this._dbClient.insert(checkoutSessionTable).values(checkout).returning();
        return this._mapper.map(insertedRow, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }

    async getCheckoutSessionById(id: string): Promise<CheckoutSession> {
        const [checkout] = await this._dbClient
            .select()
            .from(checkoutSessionTable)
            .where(eq(checkoutSessionTable.id, id))
            .limit(1);
        console.log('checkout queried:', checkout);
        return checkout;
        // return checkout;
    }
    // async getCheckoutSessionByCustomerId(customerId: string): Promise<CheckoutSession> {
    //     const [checkout] = await this._dbClient.select().from(checkoutSessionTable).where(and(eq(checkoutSessionTable.customerId, customerId), eq(checkoutSessionTable.status, 'pending'))).limit(1);
    //     return this._mapper.map(checkout, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    // }
    async updateCheckoutSession(checkout: CheckoutSession): Promise<CheckoutSession> {
        console.log('updating checkout session');
        console.log('checkout:', checkout);

        // if (!id) throw new Error('Must pass an id to updateCheckoutSession');

        // // Map every undefined → null
        // const fieldsToUpdate = Object.fromEntries(
        //     Object.entries(maybeFields).map(([key, value]) => [key, value ?? null])
        // ) as Partial<CheckoutSession>;

        const [updatedRow] = await this._dbClient
            .update(checkoutSessionTable)
            .set(checkout)
            .where(eq(checkoutSessionTable.id, checkout.id!))
            .returning();

        return this._mapper.map(updatedRow, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
    }

    async calculateCheckoutSessionSummaryTotals() {}
}
