TCP - PRoxy

1. Start the TCP Proxy
2. Stop the TCP Proxy
3. Read proxy configs from Json
4. Rest controller to get the config details via API
5. Rest Controller to Update/Add Config details via API
6. Support for multiple options while configuring (RequestDelay, ResponseDelay, RequestBytesPerSec, ResponseBytesPerSec, numOfReadBufferBytesRef, Connection Reset)
7. Logging types


# Flow Diagram

## Without Proxy

  Client(Source) --> Destination (Target)

## With Proxy
  Client(Source) --> TCPROXY(NodeJs) --> Destination (Target)
  e.g, CAS -> lg17.pte.dig.net:80 (TCPROXY) -> ifx-pte.pte1.diginsite.net:12749


######################################
# Sample config file format from Perl
# Port 80 Configurations Below
######################################
80:logLevel=1
80:bnpte11castc100.dcb.diginsite.net,ifx-pte.pte1.diginsite.net:12749;0;0;0;0;4096
