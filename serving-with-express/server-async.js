var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise;
var dbUrl = 'mongodb+srv://user:user@cluster0-1pqjg.mongodb.net/test?retryWrites=true&w=majority';

var Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    });
});

app.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    Message.find({name:user}, (err, messages) =>{
        res.send(messages)
    });
});

app.post('/messages', async (req, res) => {
    try {
        //throw 'error';
        var message = new Message(req.body);
   
        var savedMessage = await message.save();
        console.log('Saved')
        var censored = await Message.findOne({message: 'badword'});
    
        if(censored){
            await Message.remove({_id: censored.id})
            res.sendStatus(500)
        }else{
            io.emit('messages', req.body);
        }    
    
        res.sendStatus(200);    
    } catch (error) {
        res.sendStatus(500) 
        console.error(error)
    } finally{
       console.log('message post called');
    }
});


io.on('connection', (socket) => {
    console.log('user connected')
});

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) =>{
    console.log('mongo db connection', err);
})

var server = http.listen(3000, () => {
    console.log('server is listening on port:', server.address().port)
});