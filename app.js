const express = require('express');
const controller = require('./controller')
const proxy = require('./tcproxy');
const config = require('./config.js');

// module variables
const app = express()
const port = 3001

// environment variables
process.env.NODE_ENV = 'pte';


var serviceHosts = ["apache.org", "apache.org"];
var servicePorts = [8091, 8092];
//Enabling proxy
//exports.createProxy = proxy.createProxy;
var newProxy = proxy.createProxy(9999, serviceHosts, servicePorts, {
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

//Enabling router
app.use('/', controller)


//App Running port
app.listen(port, () => {
  console.log(`Node TCProxy app listening at http://localhost:${port}`);
})
