const express  = require('express');
const path  = require('path');
const bodyParser = require('body-parser')


const app = express();


app.use(express.json());
// app.use(bodyParser.text({ limit: '200mb' }));
// app.use(bodyParser.json({limit: '200mb'}));
// app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req,res) => res.send('INDEX'))

const PORT = process.env.PORT || 5000;

app.use('/conversion',require('./routes/index'));



app.listen(
    PORT,
    console.log(`It's alive on     ${PORT}`)
)