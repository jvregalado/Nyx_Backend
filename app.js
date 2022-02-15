"use sctrict";

const express  = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const moment = require('moment');

const api = require('./api')

const app = express();

const PORT = process.env.PORT || 31000;

/**app setup MODULES here */
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(cors({
    credentials: true
    ,origin: true
}))
app.use(helmet());

/**app setup API here */
app.use(api);

/**app listens to PORT*/
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}; as of ${moment().format('YYYY-MM-DD HH:mm:ss')}...`)
)

/**load DB here */

/**load CRON here */
