const express = require('express');
const app = express()
const port = 3000
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
//
// var options = {
//   explorer: true
// };
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

var proxy = require("./tcproxy");
exports.createProxy = proxy.createProxy;

//Enabling router
var controller = require('./controller')
app.use('/', controller)


//App Running port
app.listen(port, () => {
  console.log(`Node TCProxy app listening at http://localhost:${port}`)
})
