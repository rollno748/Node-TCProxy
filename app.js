const express = require('express');
const propReader = require('properties-reader');
const controller = require('./controller');
const proxy = require('./tcproxy');
const config = require('./config/config.js');
var envProperties = propReader('./config/application.properties');
const router = express.Router();



// module variables
const app = express()
const port = envProperties.get('server.http.port');
const proxyPort = envProperties.get('server.tcp.port');

configMap = new Map()

//console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);

//Enabling router
app.use('/', controller);

//App Running port
app.listen(port, () => {
  console.log(`Node Webservice is listening at http://localhost:${port}`);
  var jsonObj = global.gConfig

  //Converts the config json to Map 
  for(var myKey in jsonObj) {
    //console.log("key:"+myKey+", value:"+JSON.stringify(jsonObj[myKey]));
    configMap.set(myKey, jsonObj[myKey])
  }


  //Enabling proxy
  //exports.createProxy = proxy.createProxy;
  var newProxy = proxy.createProxy(proxyPort, configMap, {

    upstream: function(context, data) {
        log(context.proxySocket, data);
        return data;
    },
    downstream: function(context, data) {
        log(context.serviceSocket, data);
        return data;
    },
    serviceHostSelected: function(proxySocket, i) {
        console.log(util.format("Service host %s:%s selected for client %s:%s.",
            serviceHosts[i],
            servicePorts[i],
            proxySocket.remoteAddress,
            proxySocket.remotePort));
        // use your own strategy to calculate i 
        return i;
    }

  });
})
