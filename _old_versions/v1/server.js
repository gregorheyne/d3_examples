const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Logs Every Incoming Request:
// Each time the server receives an HTTP request, this middleware function is executed.
// It logs the URL (req.url) of the request to the console, allowing you to monitor all requests being made to your server (e.g., /index.html, /d3/dist/d3.min.js).
// The next() function tells Express to move on to the next middleware or route handler in the request-processing pipeline.
// Without next(), the request would "hang," and no further processing (e.g., serving files, handling routes) would occur.
// You’d typically use middleware like this during development for debugging purposes. 
// In production, you'd likely use a more sophisticated logging tool like Morgan, which can log request details in a structured format.
app.use((req, res, next) => {
  console.log(`Request received: ${req.url}`);
  next();
});

// Serve D3 (and other modules) from node_modules before serving your public files
app.use('/d3', express.static(path.join(__dirname, 'node_modules', 'd3')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
