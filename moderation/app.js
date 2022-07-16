const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const  cors = require("cors");
const axios = require("axios")

app.use(express.json());
app.use(cors());

app.post('/events', async (req, res)=>{
    const {type, data } = req.body
    
    if (type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
    
    await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data:{
            id: data.id,
            postId: data.postId,
            status,
            content: data.content
        }
    })
    }
    res.send({});
});

app.listen(4003, ()=>{
    console.log('Listening on port 4003')
})