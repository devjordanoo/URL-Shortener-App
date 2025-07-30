import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto"

import { ValidateParam } from "../decorators/validateParam";
import { Inject } from "../decorators/injec";

import { UrlValidation } from "../validations/emailValidation";

import { register } from "../utils/di/container";

const dynamoClient = new DynamoDBClient();
const urlValidation = new UrlValidation();

register("UrlValidation", urlValidation);

interface ShortedURLBody {
  originalUrl: string;
}

interface APIGatewayProxyEventWithBody extends Omit<APIGatewayProxyEventV2, "body"> {
  body: ShortedURLBody;
}

@Inject({
  _urlValidation: "UrlValidation"
})
class ShortedURL {
  private _urlValidation: UrlValidation;
  
  @ValidateParam("originalUrl", urlValidation)
  async handler(event: APIGatewayProxyEventWithBody) {
    const body = event.body;
    const id = randomUUID();

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
  }
}

const shortedURL = new ShortedURL();
export const handler = (event: APIGatewayProxyEventWithBody) => shortedURL.handler(event);