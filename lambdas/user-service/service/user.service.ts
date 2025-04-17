import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { driverRealtimeMetadataTable, driversTable } from '../db/schema';
import { DriverRealtimeMetadata } from '../types/types';
import { POJO } from '../types/constants';

export class UserService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}

    async saveDriverRealtimeMetadata(data: DriverRealtimeMetadata): Promise<void> {
        console.log(data);
        await this._dbClient
            .insert(driverRealtimeMetadataTable)
            .values(data)
            .onConflictDoUpdate({
                target: driverRealtimeMetadataTable.driverId,
                set: {
                    isOnDelivery: data.isOnDelivery,
                    isOnShift: data.isOnShift,
                    lastActiveAt: data.isOnShift === true ? new Date() : null,
                    lastLat: data.lastLat,
                    lastLng: data.lastLng,
                    locationLastUpdatedAt: data.lastLat && data.lastLng ? new Date() : null
                }
            });
        return;
    }

    async getDriverId(authId: string) {
        const driver = await this._dbClient.select().from(driversTable).where(eq(driversTable.authId, authId));
        return driver[0].id;
    }
}
