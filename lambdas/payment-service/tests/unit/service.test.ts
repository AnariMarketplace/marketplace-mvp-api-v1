import { expect, describe, it, jest, beforeAll } from '@jest/globals';
import { ListingService } from '../../service/listing.service';
import { mapper } from '../../mappers/listings.mapper';

jest.mock('drizzle-orm/postgres-js');

describe('MessageService Tests', () => {
    let service: ListingService;

    beforeAll(() => {
        // "dbConn" would be your drizzle connection in real usage.
        // Here, we’re returning the mock from drizzle() above.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { drizzle } = require('drizzle-orm/postgres-js');
        const dbConn = drizzle();
        service = new ListingService(dbConn, mapper);
    });

    it('should fetch  from DB', async () => {
        // const data = await service.();
        // expect().toBeDefined();
        // expect(.length).toBe(1);
        // expect([0].id).toEqual('abc123');
        // expect([0]).toMatchObject({
        //     id: 'abc123',
        //     chatId: expect.any(Number),
        //     text: expect.any(String),
        //     senderIp: expect.any(String),
        //     // etc...
        // });
    });

    // More tests here ...
    // e.g. testing other methods that create or update messages, handle errors, etc.
});
