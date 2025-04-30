import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto"

const dynamoClient = new DynamoDBClient();

export const handler = async (event: APIGatewayProxyEventV2) => {
  const body = JSON.parse(event.body as string);
  const id = randomUUID();

  const command = new PutItemCommand({
    TableName: "SitesRedirects",
    Item: {
      id: { S: id },
      originalUrl: { S: body.originalUrl }
    }
  })

  const response = await dynamoClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};