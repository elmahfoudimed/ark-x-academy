// Importing required modules
const http = require('http');
const url = require('url');
const { getTemperature } = require('./weather');

// Create the server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Handle requests for '/weather' endpoint
    if (pathname === '/weather') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (query.city) {
            try {
                const temperature = await getTemperature(query.city);
                res.end(`${query.city}, temperature: ${temperature} (Celsius)`);
            } catch (error) {
                res.end(`ERROR: ${error.message}`);
            }
        } else {
            res.end('Welcome to the weather app.');
        }

    }

});

// Start listening for requests on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})