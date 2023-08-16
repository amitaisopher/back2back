## This project is a NodeJS application that can be used as the base for any backend that requires authentication and user REST APIs. It is based on fusion of the follwoing:

1. [Medium article regarding setting up NodeJS backend with TypeScript](https://mirzaleka.medium.com/express-js-starter-api-with-typescript-deef5c4b6b70)
2. [Authentication API tutorial by Tom Does Tech](https://youtu.be/qylGaki0JhY)

Features implemeted in this project:

1. Fully typed using TypeScript
2. Integration with MongoDB by using Typegoose and PostgresSQL by using TypeORM
3. JWT based authentication with access and refresh token paradigm implemented
4. Using Zod for Schema validation on backend endpoints
5. Using PKI infrastructure to sign JSON web tokens.
6. User API
   1. Register a user
   2. Verify user's email address
   3. Send forgot password email
   4. Reset password
   5. Get current user
   6. Login
7. Authentication API
   1. Create user session and get access token.
   2. Get new access token with refresh tokens
8. Email verification post registration and email notifications in case of forgotten password
