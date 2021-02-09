var net = require('net');
var tls = require('tls');
var fs = require('fs');
var util = require('util');

module.exports.createProxy = function(proxyPort, configMap) {
    return new TcpProxy(proxyPort, configMap);
};



function TcpProxy(proxyPort, configMap) {
    this.proxyPort = proxyPort;
    this.configMap = configMap;
    //console.log('Allow all users :: '+ this.listeningHost);

    for (var [key, value] of configMap.entries()) {
      console.log(key, value);
      //console.log('TcpProxy key : ' + key + ' TcpProxy val : ' + value);
      this.createListener();
    }
    /*
    if (this.options.identUsers.length !== 0) {
        this.users = this.options.identUsers;
        this.log('Only allow these users: '.concat(this.users.join(', ')));
    } else {
        this.log('Allow all users');
    }
    */

    //this.createListener();
}

TcpProxy.prototype.createListener = function() {
    var self = this;
    self.server = net.createServer(function(socket) {
        if (self.users) {
            self.handleAuth(socket);
        } else {
            self.handleClient(socket);
        }
    });

    self.server.listen(self.proxyPort, self.options.hostname);
};


TcpProxy.prototype.handleClient = function(proxySocket) {
    var self = this;
    var key = uniqueKey(proxySocket);
    self.proxySockets[key] = proxySocket;
    var context = {
        buffers: [],
        connected: false,
        proxySocket: proxySocket
    };
    proxySocket.on("data", function(data) {
        if (context.connected) {
            context.serviceSocket.write(
                self.intercept(self.options.upstream, context, data));
        } else {
            context.buffers[context.buffers.length] =
                self.intercept(self.options.upstream, context, data);
            if (context.serviceSocket === undefined) {
                self.createServiceSocket(context);
            }
        }
    });
    proxySocket.on("close", function(hadError) {
        delete self.proxySockets[uniqueKey(proxySocket)];
        if (context.serviceSocket !== undefined) {
            context.serviceSocket.destroy();
        }
    });
    proxySocket.on("error", function(e) {
        context.serviceSocket.destroy();
    });
};
