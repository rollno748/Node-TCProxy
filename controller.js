const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


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
  res.json(Object.fromEntries(configMap));
})

router.post('/config', function (req, res) {
  var data = req.body;
  console.log(data);
  // var response = "";
  // for(var myKey in jsonObj) {
  //   if(!configMap.has(myKey)){
  //     response="Configs already present, skipping activity";
  //   }else {
  //     console.log("key:"+myKey+", value:"+JSON.stringify(jsonObj[myKey]));
  //     configMap.set(myKey, jsonObj[myKey])
  //     response="Configs Added successfully";
  //   }
  // }
    res.json(req.body);
})

router.put('/config', function (req, res) {
  res.send('PUT call for config')
})


//export router to use in app.js
module.exports = router
