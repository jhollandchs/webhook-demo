// Import the built-in http module
const http = require('http');

// Define the port to listen on
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Set the response headers
    res.setHeader('Content-Type', 'text/plain');
    
    // Handle different routes
    if (req.url === '/') {
        res.statusCode = 200;
        res.end('Hello, World!');
    } else if (req.url === '/webhook') {
        res.statusCode = 200;
        res.end('webhook response data!');
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
