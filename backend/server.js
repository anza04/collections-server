const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', async(req, res)=>{
    res.json({ message: 'Test succesfull' });
});

app.listen(3000, ()=>(console.log('App listening on port 3000')));