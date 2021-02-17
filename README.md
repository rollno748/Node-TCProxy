# TCP-Proxy
## _Node JS based application for TCPProxy_

# Dependencies
- Node v14.15.4 or Higher
- Npm v6.14.10

## Installation Instructions
Download the project from gitlab (git clone <repo url>)
Configure the directory path in `tcp-proxy` file
Install the dependencies and devDependencies and start the server.


```sh
cd tcp-proxy
npm install
tcp-proxy start 
```
App Usage `tcp-proxy start|stop|restart|status`

## Features

[x] Read proxy configs from Json
[x] GET all proxy configs via REST API
[x] POST(Add) a new proxy configs via REST API
[x] PUT(Update) proxy configs via REST API
[x] Expose separate ports for REST, TCP 
[ ] Route the TCP request to the respective downstream (proxying)
[ ] Support for RequestDelay
[ ] Support for ResponseDelay
[ ] Support for RequestBytesPerSec
[ ] Support for ResponseBytesPerSec 
[ ] Support for numOfReadBufferBytesRef
[ ] Support for Connection Reset

## Configs
The port  configuration can be changed/updated by setting the available port in `application.properties` file
- `server.http.port` for Webservices API port
- `server.tcp.port` for TCP port


# Flow Diagram

## Without Proxy

  Client(Source A) --> Destination (Target B)

## With Proxy
  Client(Source A) --> TCPROXY(NodeJs X) --> Destination (TargetB )
  e.g, CASAPP -> lg17.net:80 (TCPROXY) -> ifx.net:12749


######################################
# Sample config file format from Perl
# Port 80 Configurations Below
######################################
80:logLevel=1
80:castc100.net,ifx.net:12749;0;0;0;0;4096
