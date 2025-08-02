# 🌐 Serverless Website: Visitor Counter + AWS Cognito Auth

## 🔷 Project Overview

This project is a static website enhanced with serverless AWS functionality:

- 🔢 **Real-time Visitor Count** using Lambda, DynamoDB, and API Gateway  
- 🔐 **User Authentication** using AWS Cognito Hosted UI  
- 💻 Frontend built with HTML, CSS, and JavaScript

It demonstrates full-stack serverless development using AWS services, ideal for learning or as a portfolio project.

---

## 🗂️ Features

| Feature                  | Description |
|--------------------------|-------------|
| 🧮 Visitor Counter        | Tracks unique visitors via cookies, updates and retrieves count from DynamoDB |
| 🔐 Cognito Auth           | Login/Logout flow using AWS Cognito Hosted UI |
| 📊 Session UI             | Shows login status and partial ID token to authenticated users |
| ☁️ Fully Serverless       | No backend servers; all logic in Lambda, API Gateway, and managed services |

---

## 🧱 Architecture

```
[Visitor] ─▶ [CloudFront (optional)]
              └──▶ [API Gateway] ─▶ [Lambda Function] ─▶ [DynamoDB Table: VisitorCount]

[User] ─▶ [Your Website]
            ├──▶ [Login with Cognito Hosted UI]
            └──▶ [Session stored in sessionStorage]
```

---

## 🧰 Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend/API:** AWS Lambda + API Gateway
- **Database:** DynamoDB
- **Authentication:** AWS Cognito (Hosted UI)
- **Optional:** CloudFront (for global CDN caching and auth Lambda@Edge)

---

## 📦 Folder Structure

```bash
project-root/
│
├── index.html        # Main webpage
├── styles.css        # Page styling
├── auth.js           # Cognito login/logout/session logic
├── visitor.js        # (Optional) JS for calling visitor count API
├── README.md         # Project documentation
│
└── lambda/
    └── index.mjs     # Lambda function to update/read visitor count
```

---

## 🔧 Visitor Count API – Setup Guide

### 1. Create DynamoDB Table

- **Table name:** `VisitorCount`
- **Partition key:** `id` (String)
- Add an initial item: `{ "id": "global", "count": 0 }`

### 2. Create IAM Role

- Name: `visitor-counter-role`
- Attach policy with permission:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:UpdateItem",
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:<region>:<account_id>:table/VisitorCount"
    }
  ]
}
```

Attach this role to your Lambda function.

### 3. Create Lambda Function

- Runtime: Node.js 20+
- Handler: `index.handler`
- Example code:

```js
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "VisitorCount";

export const handler = async () => {
  const params = {
    TableName: tableName,
    Key: { id: { S: "global" } },
    UpdateExpression: "SET #count = if_not_exists(#count, :zero) + :incr",
    ExpressionAttributeNames: { "#count": "count" },
    ExpressionAttributeValues: {
      ":incr": { N: "1" },
      ":zero": { N: "0" }
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await client.send(new UpdateItemCommand(params));
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ count: parseInt(result.Attributes.count.N) })
    };
  } catch (error) {
    console.error("Error updating count:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update visitor count" })
    };
  }
};
```

### 4. Create API Gateway

- **REST API or HTTP API** (HTTP API preferred)
- Integration: Lambda
- Enable CORS: ✅ Allow `GET`, `OPTIONS`, any origin
- Deploy to stage: `prod`

---

## 🔐 Cognito Auth Setup

1. **Create a User Pool**
   - Set up sign-in with username/email
   - Enable Hosted UI under “App client settings”

2. **Create App Client**
   - Don’t generate a client secret
   - Redirect URIs: `http://localhost:5500` or your website
   - Allowed flows: `Authorization code grant` or `Implicit grant (token)`

3. **Enable Hosted UI**
   - Domain name: e.g., `myweb-auth.auth.eu-north-1.amazoncognito.com`

4. **Frontend Integration**
   - Use the `auth.js` provided above to:
     - Redirect to Hosted UI for login
     - Store the `id_token` in sessionStorage
     - Display session status
     - Log out and clear session

---



- [ ]  CloudFront + Lambda@Edge for session control at the CDN level
- [ ] Track unique visitors using browser cookies (not just raw hits)
- [ ] Protect parts of your frontend using Cognito tokens
- [ ] Add Admin Panel to view visitor count with admin login

---

## 📎 Credits

- AWS Documentation
- AWS SDK v3 for Node.js
- Cognito Hosted UI Guides

---

## 📬 Contact

> Project built by **[Ben]**  
> [GitHub](https://github.com/benzo009/) • [umehbenjamin220@gmail.com]
