// __mocks__/drizzle-orm/postgres-js.ts

import { Listing } from '../../../types/types';

export const drizzle = jest.fn().mockImplementation(() => {
    return {
        select: jest.fn(() => ({
            from: jest.fn((): Promise<Listing[]> => {
                return Promise.resolve<Listing[]>([
                    {
                        id: 'abc123',
                        price: '10.99',
                        sellerId: 's',
                        title: 'Test',
                        purchaseType: 'RENT'
                    }
                ]);
            })
        }))
    };
});
