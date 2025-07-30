import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto"

import { ValidateParam } from "../decorators/validateParam";
import { Inject, injectDependencies } from "../decorators/injec";

import { UrlValidation } from "../validations/emailValidation";
import { ShortedUrlRepository } from "../repositories/ShortedUrlRepository";

import { boostrap, TOKENS } from "../utils/di/bootstrap";
import { resolve } from "../utils/di/container";

boostrap();
const urlValidation = new UrlValidation();

interface ShortedURLBody {
  originalUrl: string;
}

interface APIGatewayProxyEventWithBody extends Omit<APIGatewayProxyEventV2, "body"> {
  body: ShortedURLBody;
}

class ShortedURL {
  @Inject(TOKENS.ShortedUrlRepository)
  public _shortedUrlRepository: ShortedUrlRepository;

  constructor() {
    injectDependencies(this);
  }

  @ValidateParam("originalUrl", urlValidation)
  async handler(event: APIGatewayProxyEventWithBody) {
    const body = event.body;
    const id = randomUUID();

    await this._shortedUrlRepository.create(id, body);

    return {
      statusCode: 200,
      body: JSON.stringify(id),
    };
  }
}

const shortedURL = new ShortedURL();
export const handler = shortedURL.handler.bind(shortedURL);