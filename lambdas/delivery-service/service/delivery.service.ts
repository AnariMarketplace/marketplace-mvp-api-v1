import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, like, sql } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { QueryBuilder } from 'drizzle-orm/pg-core';
import { PricingRequest } from '../types/types';
import { pricingRequestsTable } from '../db/schema';

export class DeliveryService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async create(pricingRequest: PricingRequest): Promise<PricingRequest> {

        const deliveryAddressLength = pricingRequest.deliveryAddress?.length
        const pickupAddressLength = pricingRequest.pickupAddress?.length

        if(deliveryAddressLength == null || pickupAddressLength == null){
            throw new Error()
        }

        const calculatedValues = {
            totalFee: (deliveryAddressLength + pickupAddressLength) / 3
        }

        pricingRequest.totalFee = calculatedValues.totalFee

        const [insertedRow] = await this._dbClient.insert(pricingRequestsTable).values(pricingRequest).returning();
        return this._mapper.map(insertedRow, POJO.PRICING_REQUEST_TABLE_SCHEMA, POJO.PRICING_REQUEST);
    }
}
