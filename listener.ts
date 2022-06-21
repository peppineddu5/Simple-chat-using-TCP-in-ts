import * as net from "net";
import { sleep,HOST,PORT } from "./util/util";
//variable to not rewrite
let myData = ""


const init=async()=> {
    await sleep(1000)

    const client = new net.Socket();

    // try to connect
    client.connect(PORT, HOST, async ()=> {

        console.log('Connected to: ' + HOST + ':' + PORT);
        let stopComunication = false;
        console.log("If you want to exit type exit")
        do {
            //Get input text
            const readline = await require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const it = readline[Symbol.asyncIterator]();
            const line = await it.next();

            //Check if he wants to go out
            if(line.value=="exit"){
                stopComunication=true
                continue
            }
            //Send the message
            client.write(line.value);
            myData = line.value

            readline.close();

        } while (!stopComunication);
        //Disconnecting
        client.write("bye im disconnecting")
        await sleep(200)
        client.destroy();
    });

    client.on('data', (data:Buffer)=> {
        //if the value is not what he sent, he writes it
        if (!(data.toString('utf8') == myData)) {
            console.log(data.toString('utf8'))
        }
        myData = ""
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
}

init()