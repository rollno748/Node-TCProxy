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

    for (var [key, value] of configMap.entries()) {
      //console.log(key, value);
      //console.log('TcpProxy key : ' + key + ' TcpProxy val %j: ', value);
    }

    server.on("connection", function(socket){
      var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
      console.log('New client connection established ::'+ remoteAddress);

      socket.on("data", function(d){
        console.log("Data received from %s :: %s", remoteAddress,d);
      });

      socket.on("close", function(){
        console.log("Connection is closed for the server :: %s", remoteAddress);
      });

      socket.on("error", function(err){
        console.log("Error occurred for the server :: %s \n error ::",remoteAddress, err.message);
      });

    });

    server.listen(proxyPort, function(){
      console.log(`Node TCProxy is listening at localhost:${proxyPort}`);
    })

    //this.createListener();

}
