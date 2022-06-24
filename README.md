# Chat UOL API

## Table of contents

- [Chat UOL API](#chat-uol-api)
  - [Table of contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Technologies](#technologies)
  - [Status](#status)
  - [Running the project](#running-the-project)

## Project Description

My second back-end project proposed by the **Driven Education Bootcamp** is the implementation of Chat UOL API, a **Bate-Papo UOL** clone, one of the most used online chats in Brazil.

## Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Status

<!-- ![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg) -->
![status-in-progress](https://user-images.githubusercontent.com/97575616/153774620-d6a0a615-9d38-4402-ae72-20c52f8bbd5c.svg)

## Running the project

1. Clone the repository:

    ```console
    git clone https://github.com/akiraTatesawa/api-bate-papo-uol.git
    ```

2. Navigate to the project directory:

    ```console
    cd api-bate-papo-uol
    ```

3. Install the dependencies:

    ```console
    npm install
    ```

4. Set your environment variables following the .env.example file:

   ```text
   URL_CONNECT_MONGO=
   PORT=
   DATABASE_NAME=
   ```

5. Initialize mongodb:

    ```console
    mongod --dbpath ~/.mongo 
    ```

6. Run the server in dev:

    ```console
    $ npm run dev

    > server@1.0.0 dev
    > nodemon ./src/index.js

    [nodemon] 2.0.16
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node ./src/index.js`

    Connected to the database...
    Server running on port 5000...
    ```
