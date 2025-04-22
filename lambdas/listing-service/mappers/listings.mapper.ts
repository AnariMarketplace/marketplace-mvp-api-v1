import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { POJO } from '../types/constants';
import {
    ApiQueryInputDto,
    Listing,
    ListingInputDto,
    ListingOutputDto,
    listingProps
    // ListingTableSelectSchema
} from '../types/types';

export function createMetadata() {
    PojosMetadataMap.create<Listing>(POJO.LISTING, {
        ...listingProps
    });

    PojosMetadataMap.create<ListingOutputDto>(POJO.LISTING_OUTPUT_DTO, {
        ...listingProps
    });

    PojosMetadataMap.create<ListingInputDto>(POJO.LISTING_INPUT_DTO, {
        ...listingProps
    });

    // PojosMetadataMap.create<ListingTableSelectSchema>(POJO.LISTING_TABLE_SCHEMA, {
    //     ...listingProps
    // });

    PojosMetadataMap.create<ApiQueryInputDto>(POJO.LISTING_API_QUERY, {
        searchTitle: String,
        condition: String,
        proximityMiles: String,
        searchMatchMode: String
    });

    PojosMetadataMap.create<any>(POJO.LISTING_API_QUERY_UNSTRUCTURED, {
        searchTitle: String,
        condition: String,
        proximityMiles: String,
        searchMatchMode: String
    });
}

createMetadata();

export const mapper = createMapper({ strategyInitializer: pojos() });

createMap<Listing, ListingOutputDto>(mapper, POJO.LISTING, POJO.LISTING_OUTPUT_DTO);
createMap<ListingInputDto, Listing>(mapper, POJO.LISTING_INPUT_DTO, POJO.LISTING);
// createMap<ListingTableSelectSchema, Listing>(mapper, POJO.LISTING_TABLE_SCHEMA, POJO.LISTING);
createMap(mapper, POJO.LISTING_API_QUERY_UNSTRUCTURED, POJO.LISTING_API_QUERY);
