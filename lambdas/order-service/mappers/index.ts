import { createMap, createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import { POJO } from '../types/constants';
import {
    CheckoutSession,
    CheckoutSessionInputDto,
    CheckoutOutputDto,
    CheckoutSessionTableSelectSchema
} from '../types/types';
import { loadCheckoutSessionMappings } from './checkoutSession.mapper';

function createMetadata() {
    loadCheckoutSessionMappings();
}

export const mapper = createMapper({ strategyInitializer: pojos() });
export default createMetadata;

createMetadata();
createMap<CheckoutSession, CheckoutOutputDto>(mapper, POJO.CHECKOUT, POJO.CHECKOUT_OUTPUT_DTO);
createMap<CheckoutSessionInputDto, CheckoutSession>(mapper, POJO.CHECKOUT_INPUT_DTO, POJO.CHECKOUT);
createMap<CheckoutSessionTableSelectSchema, CheckoutSession>(mapper, POJO.CHECKOUT_TABLE_SCHEMA, POJO.CHECKOUT);
