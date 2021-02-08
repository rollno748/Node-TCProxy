const express = require('express');
const controller = require('./controller')
const proxy = require('./tcproxy');
const config = require('./config.js');

// module variables
const app = express()
const port = 3001

// environment variables
process.env.NODE_ENV = 'pte';

//Enabling proxy
exports.createProxy = proxy.createProxy;

//Enabling router
app.use('/', controller)


//App Running port
app.listen(port, () => {
  console.log(`Node TCProxy app listening at http://localhost:${port}`);
})
