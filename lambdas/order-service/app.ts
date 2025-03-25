import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { initServer } from './server';

const { routes, service } = initServer();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Log the incoming request method/path
    console.log('Incoming request:', event.httpMethod, event.path);

    // Find the matching route
    const route = routes.find((r) => r.method === event.httpMethod && r.path === event.path);

    // If no route is found, return 404
    if (!route) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Route not found' })
        };
    }

    try {
        // Delegate handling to the matched route
        return await route.handler(event, service);
    } catch (err: any) {
        // Log and return the error
        console.error('Error handling request:', err);

        return {
            statusCode: err.statusCode ?? 500,
            body: err?.errors ? JSON.stringify(err.errors) : 'Internal Server Error'
        };
    }
};
