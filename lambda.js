import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// ✅ DynamoDB settings
const TABLE_NAME = "VisitorCounter";
const PARTITION_KEY = "visitor";
const PARTITION_KEY_VALUE = "unique"; // fixed value for all unique visitors

const client = new DynamoDBClient({ region: "us-east-1" }); // Replace with your region

export const handler = async (event) => {
  try {
    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: {
        [PARTITION_KEY]: { S: PARTITION_KEY_VALUE },
      },
      UpdateExpression: "ADD visitCount :incr",
      ExpressionAttributeValues: {
        ":incr": { N: "1" },
      },
      ReturnValues: "UPDATED_NEW",
    });

    const result = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Visitor count updated successfully!",
        count: result.Attributes.visitCount.N,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
