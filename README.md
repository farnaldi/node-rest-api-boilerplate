# REST API using Node, Express, Knex & TypeScript

This is a boilerplate for building scalable and robust REST APIs using Node & TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Available Routes](#available-routes)
- [Available Scripts](#available-scripts)
- [Contributing] (#contributing)
- [License](#license)

## Prerequisites

This project uses node and npm. Go check them out if you don't have them locally installed. Also, you need to install [MySQL](https://www.mysql.com/) either on your local machine or using a cloud service.

## Features

- [TypeScript](https://www.typescriptlang.org/) as Language

- Framework: [Express.js](https://expressjs.com/)

- ORM: [Objection](https://vincit.github.io/objection.js/) combined with [Knex](http://knexjs.org/)

- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) used to validate the request payloads

- Linting and formatting code using [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

- Authentication & Authorization with [JSON Web Tokens](https://jwt.io/) using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- [Morgan](https://github.com/expressjs/morgan) for logging request

- [Helmet](https://helmetjs.github.io/) to improve the security

- Versioned routes

## Installation

1. install the dependencies using `npm install` or `npm i`

2. Copy the file `.env.example`, rename the copy `.env` and add the correct information

3. Start the app using `npm run dev`

4. After that, go to: `http://localhost:3000/`

## Available routes

| Method   | Resource               | Description                                                                                                                                 |
| :------- | :----------------------| :------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/v1/auth/register`    | Create a new user in the DB. You need to specify in the body the following attributes: firstName, lastName, email & password.               |
| `POST`   | `/v1/auth/login`       | Sign in with the email & password. If it's successful, then generates a token                                                               |
| `GET`    | `/v1/users/me`         | Returns the authenticated user

## Available scripts

- `build` - Transpile TypeScript to ES6,
- `lint` - Lint your TS code,
- `dev` - Run the app without transpile to ES6
- `start` - Run the transpiled app
- `knex:migrate:make` - Create a new migration, it needs the migration name as parameter
- `knex:migrate:latest` - Apply the latest migrations to the database
- `knex:migrate:rollback` - Rollback the latest migration applied.

## Contributing

Feel free to dive in! Open an issue or submit PRs.

Standard Readme follows the [Contributor Covenant](https://www.contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT © farnaldi](https://github.com/farnaldi/node-rest-api-boilerplate/blob/master/LICENSE)
