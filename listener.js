const net = require('net');

const server = net.createServer()

const listen = () =>{
    server.listen(4444)
    return server
}


module.exports = {
    listen
}