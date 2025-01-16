// Create web server

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/comments' && method === 'GET') {
    fs.readFile('comments.txt', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
      }
    });
  } else if (url === '/comments' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      fs.appendFile('comments.txt', body + '\n', (err) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error');
        } else {
          res.statusCode = 200;
          res.end('Success');
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running');
});