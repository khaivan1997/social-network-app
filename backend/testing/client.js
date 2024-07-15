const io = require('socket.io-client').connect;
const socket = io('http://192.168.2.3:3000');

var arr = [];
socket.on('connect', () => {
    socket.emit('getArray', 'array');

    socket.on('array', (e, finish) => {
        arr.push(e);
        console.log(e);
        if(finish) console.log("done");
    });

    //socket.emit("number", 1);
    socket.on("hello", msg=> {
        console.log(msg);
    });
    socket.on('info', (msg,buffer) => {
        console.log(msg);
        console.log(buffer);
    }); 
});


