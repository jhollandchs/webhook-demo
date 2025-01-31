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
        //var clientid = req.headers['X-ADOBESIGN-CLIENTID'];
        //Validate it

        let clientid = req.headers['X-ADOBESIGN-CLIENTID'] || '';
        if (!clientid) {
            clientid = req.headers['x-adobesign-clientid'] || '';
        }

        // Collect the body data
        let body = '';

        // Listen for data events
        req.on('data', chunk => {
            body += chunk;
        });

        // Once the entire body is received, log it
        req.on('end', () => {
            console.log('Request body:', body); // Logs the body

            // Handle the response as before
            if (clientid === "UB7E5BXCXY" || 1 == 1) { // Replace '1 == 1' with proper logic
                res.setHeader('X-AdobeSign-ClientId', clientid);
                res.statusCode = 200;
            }

            res.end();
        });

        // Handle errors if any
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
