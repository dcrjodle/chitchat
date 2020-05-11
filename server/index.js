const express = require('express')
const bodyParser = require('body-parser')
const socket = require("socket.io")
const {Users, Messages} = require('./sequelize')
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

/* create a sub
app.post('/api/subs', (req, res) => {
    console.log(req.body)
    Subscribers.create(req.body)
        .then(subs => res.json(subs))
})

// get all sub
app.get('/api/subs', (req, res) => {
    Subscribers.findAll().then(subs => res.json(subs))
})

// get with prenumeration number
app.get('/api/subs/:prenNmr?', (req, res) => {
    Subscribers.findAll({
        where: { id: req.params.prenNmr }
    }).then(subs => res.json(subs))
})

app.put('/api/subs/:id?', (req, res) => {
  const id = req.params.id;

  Subscribers.update(req.body, {
    where: { id: id }
  }).then(sub => res.json(sub))
})

app.put('/api/subs/firstName/:firstName?', (req, res) => {
  const id = req.params.firstName;

  Blog.update(req.body, {
    where: { firstName: id }
  })
})

app.put('/api/subs/lastName/:lastName?', (req, res) => {
  const id = req.params.lastName;

  Blog.update(req.body, {
    where: { lastName: id }
  })
})

app.put('/api/subs/adress/:adress?', (req, res) => {
  const id = req.params.adress;

  Blog.update(req.body, {
    where: { adress: id }
  })
})

app.put('/api/subs/postalCode/:postalCode?', (req, res) => {
  const id = req.params.postalCode;

  Blog.update(req.body, {
    where: { postalCode: id }
  })
})*/

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
