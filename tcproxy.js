var net = require('net');
var fs = require('fs');
var util = require('util');

var server = net.createServer();


module.exports.createProxy = function(proxyPort, configMap) {
    return new TcpProxy(proxyPort, configMap);
};

function uniqueKey(proxyPort) {
    var key = socket.remoteAddress + ":" + socket.remotePort;
    return key;
}

function TcpProxy(proxyPort, configMap) {
    this.proxyPort = proxyPort;
    this.configMap = configMap;

    server.on("connection", function(socket){
      //var client = socket.remoteAddress.lastIndexOf(":") + ":" + socket.remotePort;
      var clientHostnameArr = socket.remoteAddress.split(":");
      var clientHostname = clientHostnameArr[clientHostnameArr.length - 1];

      if(configMap.has(clientHostname)){
        socket.on("data", function(d){
          var props = configMap.get(clientHostname)
          console.log("Data received from %s :: %s", socket.remoteAddress,d);
          console.log("Property :: %s", props);
        });  
      }
    
      socket.on("close", function(){
        //console.log("Connection is closed for the server :: %s", socket.remoteAddress.lastIndexOf(":"));
      });

      socket.on("error", function(err){
        console.log("Error occurred for the server :: %s \n error ::",socket.remoteAddress.lastIndexOf(":"), err.message);
      });

    });

    server.listen(proxyPort, function(){
      console.log(`Node TCProxy is listening at localhost:${proxyPort}`);
    })

    //this.createListener();

}
