import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { DriverRealtimeMetadata, Seller, User } from '../types/types';
import { driverRealtimeMetadataTable, driversTable, sellersTable, usersTable } from '../db';

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

    async getSellerInfo(id: string) {
        const seller = await this._dbClient.select().from(sellersTable).where(eq(sellersTable.id, id));
        return seller[0];
    }

    async createUser(user: Partial<User>): Promise<User> {
        const savedUser = await this._dbClient.insert(usersTable).values(user).returning();
        return savedUser[0];
    }

    async createSeller(seller: Partial<Seller>): Promise<Seller> {
        const savedSeller = await this._dbClient.insert(sellersTable).values({ userId: seller.userId! }).returning();
        return savedSeller[0];
    }

    async getUserByAuthId(authId: string): Promise<User> {
        const user = await this._dbClient.select().from(usersTable).where(eq(usersTable.authId, authId));
        return user[0];
    }
}
