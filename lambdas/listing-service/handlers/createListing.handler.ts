import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { mapper } from '../mappers/listings.mapper';
import { Listing, ListingInputDto, ListingInputValidationSchema, ListingOutputDto } from '../types/types';
import { EVENTS, POJO, SNS_TOPIC_ARN } from '../types/constants';
import { ListingService } from '../service/listing.service';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { ServerAuthClient } from '@anarimarketplace/auth-lib';
import { BadRequestError } from '@anarimarketplace/custom-errors';
import { parse } from '@anarimarketplace/utils';

export const createListingHandler = async (
    event: APIGatewayProxyEvent,
    service: ListingService,
    snsClient: SNSClient,
    authClient: ServerAuthClient
): Promise<APIGatewayProxyResult> => {
    const { multiValueHeaders, body: rawBody } = event;
    console.log('Create listing handler called', rawBody);
    // 1) Auth
    const token = authClient.requireAuthToken(multiValueHeaders);
    const user = await authClient.getUserFromToken(token);

    // 2) Parse + validate, injecting sellerId
    const mergedRequest = {
        ...JSON.parse(rawBody ?? '{}'),
        sellerId: user.privateMetadata.sellerId
    };

    const input = parse<ListingInputDto>(
        ListingInputValidationSchema,
        mergedRequest,
        (zErr) => new BadRequestError('Invalid listing input', { context: zErr.errors })
    );

    console.log('Input', input);

    // 3) Map → persist → map
    const entity = mapper.map<ListingInputDto, Listing>(input, POJO.LISTING_INPUT_DTO, POJO.LISTING);
    const saved = await service.create(entity);
    const output = mapper.map<Listing, ListingOutputDto>(saved, POJO.LISTING, POJO.LISTING_OUTPUT_DTO);

    // 4) Publish event
    await snsClient.send(
        new PublishCommand({
            TopicArn: SNS_TOPIC_ARN,
            Message: JSON.stringify({
                ...output,
                event: EVENTS.LISTING_CREATED_EVENT
            })
        })
    );

    return {
        statusCode: 201,
        body: JSON.stringify(output)
    };
};
