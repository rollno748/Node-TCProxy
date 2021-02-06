var express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('  ' + new Date(Date.now()).toISOString() + '  ' + req.method+ '  ' + req.path)
  next()
})


// define root call route
router.get('/', function (req, res) {
  res.send('Node TCProxy app is running')
})

// Configs API controller route
router.get('/config', function (req, res) {
  res.send('GET call for config')
})

router.post('/config', function (req, res) {
  res.send('POST call for config')
})

router.put('/config', function (req, res) {
  res.send('PUT call for config')
})


//export this router to use in our index.js
module.exports = router
