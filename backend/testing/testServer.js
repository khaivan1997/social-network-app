const app = require('express')();
const jwt = require('jsonwebtoken');
const server = app.listen(3000, ()=> {
    console.log('Listening to port 3000 ...');
});
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const key = new NodeRSA().generateKeyPair(512);
const publicKey = key.exportKey('pkcs8-public-pem');
const privateKey = key.exportKey('pkcs8-private-pem');

 
function decryptPacket(data, mKey){
    var myStr = Buffer.from(data, 'base64');
    return crypto.privateDecrypt({key: mKey, padding:crypto.constants.RSA_PKCS1_PADDING},myStr).toString('utf-8');
}

function encryptPacket(data, mKey){
    var myStr = Buffer.from(data,"utf-8");
    var encoded = crypto.publicEncrypt({key: mKey, padding:crypto.constants.RSA_PKCS1_PADDING},myStr).toString("base64");
    return encoded;
}

const fs = require('fs');
const name = "17fbccdce6a9e6afb4e0b0adc383f751.jpg";
const image = fs.readFileSync(__dirname+"\\uploads\\"+name);

const anArray = []
for(var i=0; i<10000000; i++){
    anArray.push(i);
}
console.log("done", anArray);

// listen on socket-client event
io.on('connection', socket => {
    console.log('Connected !');
    socket.join(socket.id);
    socket.on("image", img => {
        console.log("received image");
        crypto.pseudoRandomBytes(16, (err, buffer) => {
            if(err) console.log(err);
            else{
                fs.writeFile(__dirname+"\\"+buffer.toString('hex')+'.jpg', img,'binary', err => {
                    if(err) console.log(err);
                    else console.log("write successfully");
                });
            }
        });
    });

    io.to(socket.id).emit('array', anArray);

    socket.on('getArray', msg => {
        for(var i=0; i< anArray.length; i++){
            let finish = i == anArray.length-1;
            io.to(socket.id).emit('array', anArray[i], finish);
        }
    });

    socket.on("number", num => {
        if(num == 1){
            setTimeout(() => {
                io.to(socket.id).emit('hello', 'hello');
            }, 5000);
        }
        else io.to(socket.id).emit('hello','hello');
    });

    //socket.join("chat");
    //io.to(socket.id).emit("hello", "hello");
    //io.to("chat").emit("info", "socket " + socket.id + " joins chat");

    socket.on('disconnect', () => {
        socket.leave(socket.id);
        console.log('Disconnected');
    });
});

app.get('/reset', (req,res) => {
    let url = "done"
    let form = "<!DOCTYPE HTML><html><body>" +
    `<form method='post' action=${url}>` +
    "<div>Reset your password </div>"+
    "<input type='password' name='password'/>" +
    "<input type='submit'/></form>" +
    "</body></html>";
    res.send(form);
});

app.post('/done', bodyParser.urlencoded({extended:false}), (req,res) => {
    res.send("done");
});


