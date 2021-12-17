# Typescript, Express +  MongoDB REST API

## Requirements
- Node.js
- Mongo DB
- Yarn (optional)

## Setup
Make sure you have MongoDB running before starting the app:
```bash
docker run --name mongodb -p 127.0.0.1:27017:27017  -d mongo
```
Then install dependencies and run in dev watch mode:
```bash
yarn install && yarn dev
```
To run all tests, simply execute:
```bash
yarn test
```
## Postman
Postman collection is available to interact with this demo:
1. Create a user
2. Create a session
3. Do CRUD operations with the Product
