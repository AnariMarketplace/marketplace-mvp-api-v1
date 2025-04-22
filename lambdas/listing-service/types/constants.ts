export enum POJO {
    LISTING = 'Listing',
    LISTING_OUTPUT_DTO = 'ListingOutputDto',
    LISTING_INPUT_DTO = 'ListingInputDto',
    LISTING_METADATA = 'ListingMetadata',
    LISTING_TABLE_SCHEMA = 'ListingTable',
    LISTING_API_QUERY = 'ListingApiQuery',
    LISTING_API_QUERY_UNSTRUCTURED = 'ListingApiQueryUnstructured'
}

export const SNS_TOPIC_ARN = 'arn:aws:sns:us-west-2:000000000000:FanoutTopic';

export enum EVENTS {
    LISTING_CREATED_EVENT = 'LISTING_SERVICE:LISTING:CREATED'
}
