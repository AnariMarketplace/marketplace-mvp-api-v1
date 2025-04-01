import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, like, sql } from 'drizzle-orm';
import { Mapper } from '@automapper/core';
import { POJO } from '../types/constants';
import { QueryBuilder } from 'drizzle-orm/pg-core';

export class DeliveryService {
    constructor(private readonly _dbClient: PostgresJsDatabase, private readonly _mapper: Mapper) {}
}
