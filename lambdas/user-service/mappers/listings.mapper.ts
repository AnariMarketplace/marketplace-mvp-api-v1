import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { Driver, DriverRealtimeMetadata, DriverRealtimeMetadataInputSchema, VehicleInfo } from '../types/types';
import { z } from 'zod';

export function createMetadata() {
    PojosMetadataMap.create<DriverRealtimeMetadata>(POJO.DRIVER_REALTIME_METADATA, {
        isOnDelivery: Boolean,
        isOnShift: Boolean,
        lastActiveAt: String,
        lastLat: Number,
        lastLng: Number,
        driverId: String
    });

    PojosMetadataMap.create<z.infer<typeof DriverRealtimeMetadataInputSchema>>(
        POJO.DRIVER_REALTIME_METADATA_INPUT_SCHEMA,
        {
            isOnDelivery: Boolean,
            isOnShift: Boolean,
            lastActiveAt: String,
            lastLat: Number,
            lastLng: Number,
            driverId: String
        }
    );

    PojosMetadataMap.create<VehicleInfo>(POJO.VEHICLE_INFO, {
        make: String,
        model: String,
        year: Number,
        color: String,
        plateNumber: String
    });

    PojosMetadataMap.create<Driver>(POJO.DRIVER, {
        id: String
        // vehicleInfo: POJO.VEHICLE_INFO
    });
}

createMetadata();

export const mapper = createMapper({ strategyInitializer: pojos() });

// createMap<any, Driver>(mapper,    POJO.DRIVER, POJO.DRIVER);
createMap<z.infer<typeof DriverRealtimeMetadataInputSchema>, DriverRealtimeMetadata>(
    mapper,
    POJO.DRIVER_REALTIME_METADATA_INPUT_SCHEMA,
    POJO.DRIVER_REALTIME_METADATA
);
