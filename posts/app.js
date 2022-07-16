const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const  cors = require("cors");
const axios = require("axios")

app.use(express.json());
app.use(cors());

//Storing every post created in memory
const posts = {};
app.get('/posts', (req, res)=>{
    res.send(posts)
})
app.post('/posts', async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id]={
        id, title
    };
   await axios.post('http://localhost:4005/events', {
        type:'PostCreated',
        data: {
            id, title
        }
    });
    res.status(201).send(posts[id]);
});
//Receiving Events
app.post('/events', (req,res)=>{
    console.log('Received Event', req.body.type);

    res.send({});
})
app.listen(4000, ()=>{
    console.log('Listening on port 4000')
})