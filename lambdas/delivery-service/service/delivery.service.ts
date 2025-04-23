import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { PricingRequest } from '../types/types';
import { pricingRequestsTable } from '../db/pricingRequestTable';

export class DeliveryService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async createPricingRequest(pricingRequest: PricingRequest): Promise<PricingRequest> {
        const deliveryAddressLength = pricingRequest.deliveryAddress?.length;
        const pickupAddressLength = pricingRequest.pickupAddress?.length;

        if (deliveryAddressLength == null || pickupAddressLength == null) {
            throw new Error();
        }

        const calculatedValues = {
            totalFee: (deliveryAddressLength + pickupAddressLength) / 3
        };

        pricingRequest.totalFee = calculatedValues.totalFee;

        const [insertedRow] = await this._dbClient.insert(pricingRequestsTable).values(pricingRequest).returning();
        return this._mapper.map(insertedRow, POJO.PRICING_REQUEST_TABLE_SCHEMA, POJO.PRICING_REQUEST);
    }

    private async calculateDistanceAndDuration(pickupAddress: string, deliveryAddress: string) {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURI(
                deliveryAddress
            )}&origins=${encodeURI(pickupAddress)}&units=imperial&key=${process.env.GOOGLE_API_KEY}`,
            {
                method: 'Get'
            }
        );

        const data = await res.json();
        return {
            distance: {
                raw: data.rows[0].elements[0].distance.value,
                text: data.rows[0].elements[0].distance.text
            },
            duration: {
                raw: data.rows[0].elements[0].duration.value,
                text: data.rows[0].elements[0].duration.text
            }
        };
    }
}
