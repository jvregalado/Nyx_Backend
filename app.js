"use sctrict";

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const moment = require('moment');

const middleware = require('./middleware');
const api = require('./api');

const app = express();

const { sequelize } = require('./models/nyx')

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

/**middleware setups here */
app.use(middleware);

/**app setup API here */
app.use(api);

/**app listens to PORT*/
app.listen(
	PORT,
	console.log(`Server running on port ${PORT}; as of ${moment().format('YYYY-MM-DD HH:mm:ss')}...`)
)

/**load DB here */
// sequelize.sync()


/**load CRON here */
