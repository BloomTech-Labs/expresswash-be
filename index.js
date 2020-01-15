const server = require('./api/server.js');
require('dotenv').config();

const PORT = 8080;
const HOST = '0.0.0.0';
// const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
