// tests/integration/createMessage.test.ts

import { describe, it, expect } from '@jest/globals';
import { Listing, ListingInputDto } from '../../types/types';
describe('Integration: POST/listings', () => {
    // Adjust baseUrl if your SAM local server is running on a different port
    const baseUrl = 'http://127.0.0.1:4566/restapis/92roj6mmmf/local/_user_request_';

    it('should create a listing and return 201', async () => {
        // Example request body – only include fields your Lambda actually needs/uses
        const requestBody: ListingInputDto = {
            title: 'Car Jack',
            sellerId: 'da7a43a7-1d0e-4709-a9aa-79808b29c227',
            price: 10.99,
            purchaseType: 'RENT'
        };

        // Make the POST request to your local SAM endpoint (path: "/hello" in this example)
        const response = await fetch(`${baseUrl}/listings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        expect(response.status).toBe(201);

        const data: Listing = await response.json();

        expect(data).toHaveProperty('id'); // e.g. some unique ID
        expect(data.title).toBe(requestBody.title);
        expect(data.sellerId).toBe(requestBody.sellerId);
        expect(parseFloat(data.price)).toBe(requestBody.price);
        expect(data.purchaseType).toBe(requestBody.purchaseType);
    });
});
