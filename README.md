# nodejs-api-auth-backend

## Used tools

Developed under:
- Node.js 16.13.0
- NPM 8.1.0
- MongoDB 5.0.2

One of the first step when developing a Node.js project, especially a REST API server, is to be able to accept
requests from clients and authenticate the users whether to only give access to whom granted or to record the use.
Apart from usual actions (sign up/in/out), it is possible to protect routes (see profile routes) with passport

## Features

- Data stored in MongoDB
- Sign up with a name and a password
- Sign in with a name and a password
- Sign out
- Protected routes (Profile) through JWT

## How to run

1. Clone the repository:

git clone https://github.com/mphuget/nodejs-api-auth-backend.git

2. Go to the repository:

cd nodejs-api-auth-backend

3. Install the dependencies (removed from Git repository):

npm install

4. Create a directory for MongoDB data (select where to store them)

mkdir ./data

5. Run the MongoDB server from another directory than the data one (in a first terminal)

mongod --dbpath ./data

6. On another terminal, run the server

node server.js

If everything went smoothly, you should see a running on port message and connected to database messages

The different routes were tested under Postman

