import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { initServer, matchRoute } from './server';

const { routes, service, authClient } = initServer();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Log the incoming request method/path
    console.log('Incoming request:', event.httpMethod, event.path, event.pathParameters);

    if (!event.httpMethod) {
        console.log('Got empty httpmethod request, likely from lamda initialization ');
        return {
            statusCode: 100,
            body: JSON.stringify({})
        };
    }

    const matchedRoute = matchRoute(routes, event.httpMethod, event.path);

    // If no route is found, return 404
    if (!matchRoute) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Route not found' })
        };
    }

    try {
        // Delegate handling to the matched route
        //@ts-ignore
        event.pathParameters = matchedRoute.params;
        //@ts-ignore

        return await matchedRoute.route.handler(event, service, authClient);
        // return await route.handler(event, service);
    } catch (err: any) {
        // Log and return the error
        console.error('Error handling request:', err);

        return {
            statusCode: err.statusCode ?? 500,
            body: err?.errors ? JSON.stringify(err.errors) : 'Internal Server Error'
        };
    }
};
