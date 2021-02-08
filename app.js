const express = require('express');
const controller = require('./controller')
const proxy = require('./tcproxy');
const config = require('./config.js');

// module variables
const app = express()
let configMap = new Map()
const port = 3001
const proxyPort = 9999

// environment variables
process.env.NODE_ENV = 'pte';
//console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);

//Enabling router
app.use('/', controller)

//App Running port
app.listen(port, () => {
  console.log(`Node TCProxy Webservice is listening at http://localhost:${port}`);

  var jsonArray = global.gConfig
  jsonArray = JSON.parse(JSON.stringify(jsonArray));
  jsonArray.forEach(function(element) {
    configMap.set(element.sourceHost, element.targetHost+':'+element.targetPort)
    //console.log("Source Host ::" + element.sourceHost +' Mapped Target ::'+ element.targetHost+':'+element.targetPort)
  });


  var targetHosts = ["apache.org", "apache.org"];
  var targetPorts = [8090, 8091];
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

  console.log(`Node TCProxy is listening at localhost:${port}`);
})
