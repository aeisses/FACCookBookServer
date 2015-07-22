# FACCookBookServer

## Setup

To setup the server ensure you have Node version `0.10.40` installed. Then run
`npm install` which will install all the required dependencies.

## Run the App

Run the app by simply typing `./bin/server.js` which will bind by default to
port 5000. You can change the port by setting the `PORT` environment variable
(ex: `PORT=3000 ./bin/server.js`).

## Running tests

Ensure you have `gulp` installed globally (`npm install -g gulp`) then run
`gulp`.

You can run the tests automatically after every change by using the `gulp
watch` command.
