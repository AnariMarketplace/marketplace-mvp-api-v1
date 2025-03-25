import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { eq } from 'drizzle-orm';
// import { Listing } from '../types/types';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import Stripe from 'stripe';

export class PaymentService {
    constructor(
        private readonly _dbClient: PostgresJsDatabase,
        private readonly _mapper: Mapper,
        private readonly _stripe: Stripe
    ) {}

    async createPaymentIntent(checkoutRequestId: string): Promise<any> {
        const paymentIntent = await this._stripe.paymentIntents.create({
            currency: 'usd',
            amount: 1000
        });
        console.log(paymentIntent);

        return {
            clientSecret: paymentIntent.client_secret
        };
    }

    async processPaymentIntentSuccessEvent(event: any) {
        console.log(event);
    }
}
