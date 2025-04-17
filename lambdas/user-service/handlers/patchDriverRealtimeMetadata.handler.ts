import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { DriverRealtimeMetadataInputSchema } from '../types/types';
import { POJO } from '../types/constants';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { ZodError } from 'zod';
import { ClerkClient, verifyToken } from '@clerk/backend';
import { UserService } from '../service/user.service';

export const patchDriverRealtimeMetadataHandler = async (
    event: APIGatewayProxyEvent,
    service: UserService,
    authClient: ClerkClient
): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.headers);
        console.log(event.multiValueHeaders);
        const { sub } = await verifyToken(event.multiValueHeaders['Authorization']![0].split(' ')[1], {
            secretKey: 'sk_test_IeR9sud1KkxZXGHZcSZxm680Ftp3WECRl5LMnGzfX5'
        });
        const payload = JSON.parse(event.body ?? '{}');
        console.log(payload);
        const id = await service.getDriverId(sub);
        const validInput = DriverRealtimeMetadataInputSchema.parse({ ...payload, driverId: id });

        await service.saveDriverRealtimeMetadata(
            mapper.map(validInput, POJO.DRIVER_REALTIME_METADATA_INPUT_SCHEMA, POJO.DRIVER_REALTIME_METADATA)
        );

        return {
            statusCode: 204,
            body: ''
        };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError(error.message, { context: error.errors });
        }

        throw error;
    }
};
