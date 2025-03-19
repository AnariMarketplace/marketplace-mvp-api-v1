import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import { Listing, ListingInputDto, ListingOutputDto } from '../types/types';
import { ListingTableSelectSchema } from '../db/schema';

export function createMetadata() {
    // PojosMetadataMap.create<MessageMetadata>(MESSAGE_POJO.MESSAGE_METADATA, {
    //     sendingSpeed: String,
    //     textColor: String,
    //     textLength: String
    // });

    PojosMetadataMap.create<Listing>(POJO.LISTING, {
        id: String,
        title: String,
        price: Number,
        purchaseType: String,
        sellerId: String
        // metadata: POJO.MESSAGE_METADATA,
    });

    PojosMetadataMap.create<ListingOutputDto>(POJO.LISTING_OUTPUT_DTO, {
        id: String,
        title: String,
        price: Number,
        purchaseType: String,
        sellerId: String
        // metadata: POJO.MESSAGE_METADATA
    });

    PojosMetadataMap.create<ListingInputDto>(POJO.LISTING_INPUT_DTO, {
        title: String,
        price: Number,
        purchaseType: String,
        sellerId: String
        // metadata: POJO.MESSAGE_METADATA
    });

    PojosMetadataMap.create<ListingTableSelectSchema>(POJO.LISTING_TABLE_SCHEMA, {
        id: String,
        title: String,
        price: Number,
        purchaseType: String,
        sellerId: String
    });
}

createMetadata();

export const mapper = createMapper({ strategyInitializer: pojos() });

createMap<Listing, ListingOutputDto>(mapper, POJO.LISTING, POJO.LISTING_OUTPUT_DTO);
createMap<ListingInputDto, Listing>(mapper, POJO.LISTING_INPUT_DTO, POJO.LISTING);
createMap<ListingTableSelectSchema, Listing>(mapper, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
