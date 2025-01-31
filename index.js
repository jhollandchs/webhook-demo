// Import the built-in http module
const http = require('http');

// Use the port from the environment or fallback to 3000 for local development
const port = process.env.PORT || 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {

    // Handle different routes
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end('<html><body><h1>Hello!</h1><p>You have reached the default page of your app!</p></body></html>');
    } else if (req.url === '/ping') {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;
        res.end('Pong!');
    } else if (req.url === '/webhook') {
        // Fetch client id.
        let clientid = req.headers['X-ADOBESIGN-CLIENTID'] || '';
        if (!clientid) {
            clientid = req.headers['x-adobesign-clientid'] || '';
        }

        // Collect the body data
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            console.log('Request body:');
            console.log(body);

            //Validate client id
            if (clientid === "UB7E5BXCXY" || 1 == 1) { // Replace '1 == 1' with proper logic
                res.setHeader('X-AdobeSign-ClientId', clientid);
                res.statusCode = 200;
            }

            res.end();
        });

        req.on('error', (err) => {
            console.error('Error reading request body:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Page not found');
    }
});

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
