const express  = require('express');
const cors = require('cors');

const app = express();
//app.use(express.json());
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.get('/', (req,res) => res.send('INDEX'))

const PORT = process.env.PORT || 31000;

app.use('/conversion',require('./routes/index'));

app.listen(
    PORT,
    console.log(`It's alive on     ${PORT}`),
    console.log(`It's alive on     ${process.env.PORT}`)
)