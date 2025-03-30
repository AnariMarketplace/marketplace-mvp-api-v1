import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ListingService } from '../../service/listing.service';
import { mapper } from '../../mappers/listings.mapper';
import { createListingHandler } from '../../handlers/createListing.handler';
import { SNSClient } from '@aws-sdk/client-sns';

// Mock the entire MessageService class
jest.mock('../../service/listing.service');

describe('createListingHandler tests', () => {
    let mockService: jest.Mocked<ListingService>;

    beforeEach(() => {
        // Create a mock instance of Service
        mockService = new ListingService({} as any, mapper) as jest.Mocked<ListingService>;
    });

    it('should return 200 and s on success', async () => {
        // Arrange: set up the mock to return some s
        mockService.create.mockResolvedValueOnce({
            id: '6f6cba00-45d8-49a0-a278-f3fdc9ca4813',
            title: 'Car Jack',
            price: '10.99',
            purchaseType: 'RENT',
            sellerId: 'da7a43a7-1d0e-4709-a9aa-79808b29c227'
        });
        const req = {
            id: '6f6cba00-45d8-49a0-a278-f3fdc9ca4813',
            title: 'Car Jack',
            price: 10.99,
            purchaseType: 'RENT',
            sellerId: 'da7a43a7-1d0e-4709-a9aa-79808b29c227'
        };

        const event: APIGatewayProxyEvent = {
            httpMethod: 'POST',
            body: JSON.stringify(req),
            headers: {},
            isBase64Encoded: false,
            path: '/listings',
            pathParameters: {},
            queryStringParameters: {},
            multiValueQueryStringParameters: null,
            stageVariables: null,
            multiValueHeaders: {},
            resource: '',
            requestContext: {} as any
        };

        // Act
        const result: APIGatewayProxyResult = await createListingHandler(event, mockService, new SNSClient());

        // Assert
        expect(result.statusCode).toBe(201);
        // expect(result.body).toContain('Hello from mock service');
    });

    // it('should handle errors gracefully', async () => {
    //     // Arrange: set up mock to throw
    //     mockService.create.mockRejectedValueOnce(new Error('Some DB error'));

    //     const event: APIGatewayProxyEvent = {
    //         httpMethod: 'GET',
    //         body: '',
    //         headers: {},
    //         isBase64Encoded: false,
    //         path: '/listings',
    //         pathParameters: {},
    //         queryStringParameters: {},
    //         multiValueQueryStringParameters: null,
    //         stageVariables: null,
    //         multiValueHeaders: {},
    //         resource: '',
    //         requestContext: {} as any
    //     };

    //     // Act
    //     const result: APIGatewayProxyResult = await createListingHandler(event, mockService);

    //     // Assert
    //     expect(result.statusCode).toBe(500);
    //     expect(result.body).toContain('Internal Server Error');
    // });
});
