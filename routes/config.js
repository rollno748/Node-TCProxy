const express = require('express');
const router = express.Router();


config = require('../controller/config');


router.use(function timeLog (req, res, next) {
  console.log('  ' + new Date(Date.now()).toISOString() + '  ' + req.method+ '  ' + req.path)
  next()
})


// define root call route
router.get('/', config.config);

// Configs API controller route
router.get('/config', (req, res) => {
  res.json(Object.fromEntries(configMap));
})

router.post('/config', (req, res) => {
  var jsonObj = req.body;
  //console.log(req.body);
  var response = "";
  for(var myKey in jsonObj) {
    if(!global.configMap.has(myKey)){
      global.configMap.set(myKey, jsonObj[myKey])
      response='Configs Added successfully';
    }else {
      response='Configs already present, skipping activity';
    }
  }
    res.json({ message: response });
})

router.put('/config', (req, res) => {
  var jsonObj = req.body;
  var response = "";
  for(var myKey in jsonObj) {
    if(!global.configMap.has(myKey)){
      global.configMap.set(myKey, jsonObj[myKey])
      response='Configs Updated successfully';
    }else {
      response='Failed to fetch config, skipping activity';
    }
  }
    res.json({ message: response });
})

module.exports = router // export modules to route
 