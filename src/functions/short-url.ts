import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto"

import { UrlValidation } from './../validations/emailValidation';

const dynamoClient = new DynamoDBClient();

export const handler = async (event: APIGatewayProxyEventV2) => {
  const body = JSON.parse(event.body as string);
  const id = randomUUID();

  const urlValidation = UrlValidation.validate(body.originalUrl);
  if(!urlValidation.success) {
    return {
      statusCode: 400,
      body: JSON.stringify( urlValidation ),
    };
  }

  const command = new PutItemCommand({
    TableName: "SitesRedirects",
    Item: {
      id: { S: id },
      originalUrl: { S: body.originalUrl }
    }
  });

  await dynamoClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(id),
  };
};