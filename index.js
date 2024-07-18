const express = require('express');
const db = require('./config/connection');

// this will be used for routes when ready
// const routes = require('./routes');

const PORT = process.env.PORT || 6174;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// this will be used for routes when ready
// app.use(routes);

db.once('open', () => {
    app.listen(PORT, ()=>{
        console.log(`👽 App is listening on port - ${PORT} 💻 `)
    })
})