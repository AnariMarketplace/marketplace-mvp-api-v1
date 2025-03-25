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
        private readonly stripe: Stripe
    ) {}

    async createPaymentIntent(checkoutRequestId: string): Promise<any> {
        return true;
    }
}
