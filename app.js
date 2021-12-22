const express  = require('express');
const cors = require('cors');

const app = express();


const corsConfig = {
    credentials: true,
    origin: true,
};
app.use

app.use(cors(corsConfig))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.get('/', (req,res) => res.send('INDEX'))

const PORT = process.env.PORT || 31000;

app.use('/conversion',require('./routes/conversionTool/index'));
app.use('/users',require('./routes/usertool/index'));

app.listen(
    PORT,
    console.log(`It's alive on     ${PORT}`),
    console.log(`It's alive on     ${process.env.PORT}`)
)