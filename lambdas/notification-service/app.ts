import { SQSEvent } from 'aws-lambda';
import { initServer } from './server';

const { service } = initServer();

export const lambdaHandler = async (event: SQSEvent): Promise<void> => {
    console.log('Received SQS event with records:', event.Records.length);

    for (const record of event.Records) {
        try {
            console.log('Processing SQS record:', record.messageId);
            // Parse the record body if it's JSON
            const payload = JSON.parse(record.body);
            console.log('Record payload:', JSON.parse(payload.Message));

            // Insert your SQS processing logic here.
            // For example: await processSQSRecord(payload, service);
        } catch (err: any) {
            console.error('Error processing SQS record:', record.messageId, err);
            // Optionally, handle error (e.g., log to monitoring, rethrow for retry)
        }
    }
};
