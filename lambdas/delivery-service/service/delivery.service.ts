import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { PricingRequest } from '../types/types';
import { pricingRequestsTable } from '../db/pricingRequestTable';

export class DeliveryService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async createPricingRequest(pricingRequest: PricingRequest, items: { length: number; weight: number; height: number; width: number; }[]): Promise<PricingRequest> {
    
        const distanceAndDuration = await this.calculateDistanceAndDuration(pricingRequest.pickupAddress!, pricingRequest.deliveryAddress!);
        
        let totalWeight = 0;
        items.forEach((item) => {
            totalWeight = totalWeight + item.weight!
        });

        const totalFee = this.calculateFee(
            distanceAndDuration.distance.raw,
            distanceAndDuration.duration.raw,
            totalWeight
        );

        pricingRequest.totalFee = totalFee;

        const [insertedRow] = await this._dbClient.insert(pricingRequestsTable).values(pricingRequest).returning();
        return this._mapper.map(insertedRow, POJO.PRICING_REQUEST_TABLE_SCHEMA, POJO.PRICING_REQUEST);
    }

    private calculateFee(distanceMeters: number, durationSeconds: number, totalWeight: number) {
        console.log(distanceMeters)
        console.log(durationSeconds)
        const baseFee = 3.0;
        const perMileRate = 1.0;
        const perMinuteRate = 0.5;

        const miles = distanceMeters / 1609.34; // Convert meters to miles
        const minutes = durationSeconds / 60; // Convert seconds to minutes

        const distanceCharge = perMileRate * miles // Distance charged mile * mile rate
        const weightCharge = totalWeight * 0.1 // 10% charge on weight

        return baseFee + distanceCharge+ weightCharge;
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
        const resData =  {
            distance: {
                raw: data.rows[0].elements[0].distance.value,
                text: data.rows[0].elements[0].distance.text
            },
            duration: {
                raw: data.rows[0].elements[0].duration.value,
                text: data.rows[0].elements[0].duration.text
            }
        };

        console.log(resData);
        return resData;
    }
}
