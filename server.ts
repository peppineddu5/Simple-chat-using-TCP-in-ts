import * as net from "net";
const server = net.createServer();
import { HOST,PORT } from "./util/util";

// All Scoket
const clients: Array<net.Socket> = [];

server.on("connection", socket => {
    console.log("Client connected")
    clients.push(socket);

    socket.on("data", data => {
        console.log(data)
        clients.forEach((e) => {
            e.write(data)
        })
    })

    socket.on('end', () => console.log('Client disconnected'));
    //convert all Buffer to string
    socket.setEncoding("utf8")
})

//listen
server.listen(PORT, HOST, () => console.log("Server on listening"))