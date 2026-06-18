# Web Server

A custom HTTP web server built entirely with Node.js core modules, without using Express or any other web framework.

The project demonstrates how web servers handle routing, static assets, file serving, status codes, and request logging using native Node.js functionality.

## Features

- Pure Node.js HTTP server
- No Express or third-party web frameworks
- Serves HTML pages
- Serves static CSS files
- Serves images
- Custom 404 page handling
- Request and error logging
- File-based data storage
- JSON data handling

## Project Structure

```text
WEB SERVER
│
├── css/
│   └── style.css
│
├── data/
│   ├── data.json
│   └── data.txt
│
├── img/
│   └── img1.jpg
│
├── logs/
│
├── views/
│   ├── index.html
│   ├── newPage.html
│   └── 404.html
│
├── .gitignore
├── logEvent.js
├── server.js
├── package.json
└── README.md
```

## How It Works

The server listens for incoming HTTP requests and manually routes them to the appropriate resources.

Supported resources include:

- HTML pages
- CSS stylesheets
- Images
- Text files
- JSON files

When a requested resource cannot be found, the server responds with a custom `404.html` page.

## Routes

### Home Page

```http
GET /
```

Returns:

```text
views/index.html
```

### Additional Page

```http
GET /newPage
```

Returns:

```text
views/newPage.html
```

### Static Assets

Examples:

```http
GET /css/style.css
GET /img/img1.jpg
```

### Data Files

Examples:

```http
GET /data/data.json
GET /data/data.txt
```

### Not Found

Any unknown route returns:

```text
views/404.html
```

with status code:

```http
404 Not Found
```

## Request Logging

The server includes a custom logging utility:

```text
logEvent.js
```

This module records server events and errors into the `logs` directory to assist with debugging and monitoring.

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd web-server
```

Install dependencies:

```bash
npm install
```

## Running the Server

Development:

```bash
npm start
```

or

```bash
node server.js
```

## Note

I built it to gain a deeper understanding of various HTTP basics, request and response handling and mainly for routing without express to understand the fundamentals.