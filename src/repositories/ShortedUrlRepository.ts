import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto"

import { Repository } from "../contracts/Repository";

export class ShortedUrlRepository implements Repository<any> {
  private _tableName: string = "SitesRedirects";
  private _dynamoClient: DynamoDBClient = new DynamoDBClient();

  async create(id: string, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const command = new PutItemCommand({
          TableName: this._tableName,
          Item: {
            id: { S: id },
            originalUrl: { S: body.originalUrl }
          }
        });
    
        await this._dynamoClient.send(command);
    
        resolve({
          statusCode: 200,
          body: JSON.stringify(id),
        });
      } catch (error) { 
        console.error("Error creating item:", error);
        reject(error);
      }
    })
  }

  // async read(id: string): Promise<any | null> {
  //   // Implementation for reading an item by ID
  // }

  // async update(id: string, item: any): Promise<any | null> {
  //   // Implementation for updating an item by ID
  // }

  // async delete(id: string): Promise<void> {
  //   // Implementation for deleting an item by ID
  // }

  // async list(): Promise<any[]> {
  //   // Implementation for listing all items
  // }

  // async count(): Promise<number> {
  //   // Implementation for counting items
  // }
}