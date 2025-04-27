import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { PricingRequest } from '../types/types';
import { pricingRequestsTable } from '../db/pricingRequestTable';

export class DeliveryService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async createPricingRequest(pricingRequest: PricingRequest): Promise<PricingRequest> {
        const deliveryAddress = pricingRequest.pickupAddress;
        const pickupAddress = pricingRequest.pickupAddress;

        console.log({ deliveryAddress, pickupAddress });

        if (!deliveryAddress || !pickupAddress) {
            throw new Error('Missing pickup or delivery address');
        }

        const distanceAndDuration = await this.calculateDistanceAndDuration(pickupAddress, deliveryAddress);
        pricingRequest.totalFee = await this.calculateFee(
            distanceAndDuration.distance.raw,
            distanceAndDuration.duration.raw
        );

        const [insertedRow] = await this._dbClient.insert(pricingRequestsTable).values(pricingRequest).returning();
        return this._mapper.map(insertedRow, POJO.PRICING_REQUEST_TABLE_SCHEMA, POJO.PRICING_REQUEST);
    }

    private async calculateFee(distanceMeters: number, durationSeconds: number) {
        const baseFee = 3.0;
        const perMileRate = 1.0;
        const perMinuteRate = 0.5;
        const miles = distanceMeters / 1609.34;
        const minutes = durationSeconds / 60;
        return baseFee + perMileRate * miles + perMinuteRate * minutes;
    }

    private async calculateDistanceAndDuration(pickupAddress: string, deliveryAddress: string) {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURI(
                deliveryAddress
            )}&origins=${encodeURI(pickupAddress)}&units=imperial&key=AIzaSyBMnbwGi_srnVcJt5RPdoEcoec0-LRBsWc`,
            {
                method: 'Get'
            }
        );

        const data = await res.json();
        console.log(data);
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
