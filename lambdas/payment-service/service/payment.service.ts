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

    async createPaymentIntent(checkoutId: string): Promise<any> {
        //get the total from the checkout object
        const total = 100;
        const paymentIntent = await this._stripe.paymentIntents.create({
            currency: 'usd',
            customer: await this.createCustomerPaymentId(),
            amount: total,
            metadata: { checkoutId }
        });
        console.log(paymentIntent);

        return {
            clientSecret: paymentIntent.client_secret
        };
    }

    async createCustomerPaymentId() {
        const customer = this._stripe.customers.create();
        return (await customer).id;
    }

    async processPaymentIntentSuccessEvent(event: any) {
        console.log(event);
    }
}
