'use strict';

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
  function startServer() {
  const app = express();

  // Logging for each request
  app.use((req, resp, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  console.log(m);
  next();
  });

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('3000', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 3000...');
  });
}

startServer();
