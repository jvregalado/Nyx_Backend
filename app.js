const express  = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req,res) => res.send('INDEX'))

const PORT = process.env.PORT || 31000;

app.use('/conversion',require('./routes/index'));

app.listen(
    PORT,
    console.log(`It's alive on     ${PORT}`)
)