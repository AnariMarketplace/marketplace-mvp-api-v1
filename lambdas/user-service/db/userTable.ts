import { pgTable as table, uuid, varchar } from 'drizzle-orm/pg-core';
import { userSchema } from './schema';

export const usersTable = userSchema.table('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    authId: varchar('auth_id')
});
