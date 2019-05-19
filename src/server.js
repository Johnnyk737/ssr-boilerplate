import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

import App from './client/App'


const port = 3000;
const server = express();

server.use(express.static('dist'))
server.use((req, res) => {

  const body = renderToString(<App />);
  var title = 'Server Side Rendering';

  res.send(
    renderHtml(
      body,
      title
    )
  );
});

/* Function call to render initial HTML
*/
const renderHtml = (body, title) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
      <script src="./bundle.js"></script>
    </body>
  </html>
`;

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
