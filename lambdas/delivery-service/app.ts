import { APIGatewayProxyHandler } from 'aws-lambda';
import { initServer } from './server';
import { createLambdaRouter } from '@anarimarketplace/routing';

export const lambdaHandler: APIGatewayProxyHandler = createLambdaRouter(initServer);
