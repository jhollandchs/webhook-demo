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
        // Fetch client id
        var clientid = req.headers['X-ADOBESIGN-CLIENTID'];
        //Validate it

        console.log('clientid');
        console.log(clientid);
        console.log('/clientid');

        if (clientid ==="BGBQIIE7H253K6" || 1 == 1) //Replace 'BGBQIIE7H253K6' with the client id of the application using which the webhook is created
        {
            //Return it in response header
            //res.headers['X-AdobeSign-ClientId'] = clientid;
            res.setHeader('X-AdobeSign-ClientId', clientid);
            res.statusCode = 200;
            //res.status = 200;  // default value

        }

        res.end();

        //res.setHeader('Content-Type', 'text/plain');
        //res.statusCode = 200;
        //res.end('webhook response data!');
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
