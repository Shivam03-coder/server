# HTTP Status Codes Reference

This document serves as a reference for the HTTP status codes used in this Express REST API. It provides a brief description of each status code and its appropriate usage within the application.

## Table of Contents

- [Informational Responses (100-199)](#informational-responses-100-199)
- [Successful Responses (200-299)](#successful-responses-200-299)
- [Redirection Messages (300-399)](#redirection-messages-300-399)
- [Client Error Responses (400-499)](#client-error-responses-400-499)
- [Server Error Responses (500-599)](#server-error-responses-500-599)
- [Usage in Express](#usage-in-express)

## Informational Responses (100-199)

- **100 Continue**: Indicates that the initial part of a request has been received, and the client can continue.
- **101 Switching Protocols**: The server is switching protocols as requested by the client.

## Successful Responses (200-299)

- **200 OK**: The request was successful. Typically used for `GET` and `POST` requests.
- **201 Created**: The request was successful, and a new resource was created. Used for `POST` requests.
- **202 Accepted**: The request has been accepted for processing, but the processing is not complete.
- **204 No Content**: The request was successful, but there is no content to return. Commonly used for `DELETE` requests.

## Redirection Messages (300-399)

- **301 Moved Permanently**: The requested resource has been moved to a new URL permanently.
- **302 Found**: The requested resource resides temporarily under a different URL.
- **304 Not Modified**: Indicates that the resource has not been modified since the last request.

## Client Error Responses (400-499)

- **400 Bad Request**: The server cannot process the request due to a client error (e.g., malformed request syntax).
- **401 Unauthorized**: Authentication is required, and it has either failed or not been provided.
- **403 Forbidden**: The server understands the request but refuses to authorize it.
- **404 Not Found**: The server cannot find the requested resource.
- **409 Conflict**: The request could not be completed due to a conflict with the current state of the resource.
- **422 Unprocessable Entity**: The request was well-formed but could not be processed due to semantic errors.

## Server Error Responses (500-599)

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.
- **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
- **502 Bad Gateway**: The server received an invalid response from the upstream server while acting as a gateway.
- **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overload or maintenance.
- **504 Gateway Timeout**: The server did not receive a timely response from the upstream server while acting as a gateway.

## Usage in Express

In your Express application, you can use these status codes in your route handlers. Here are a few examples:

```javascript
const express = require('express');
const app = express();

app.get('/resource', (req, res) => {
    const resource = findResource();
    if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
});

app.post('/resource', (req, res) => {
    const newResource = createResource(req.body);
    if (newResource.error) {
        return res.status(422).json({ error: newResource.error });
    }
    res.status(201).json(newResource);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
