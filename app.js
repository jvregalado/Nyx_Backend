"use sctrict";

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const moment = require('moment');

const addRequestID = require('./middleware/addRequestID');
const tokenAuthenticator = require('./middleware/tokenAuthenticator');
const responseRequestID = require('./middleware/responseRequestID');
const modulePermisionChecker = require('./middleware/modulePermissionChecker');

const api = require('./api');

const { sequelize } = require('./models/nyx')
// const db = require('./models/crossdock')

const PORT = process.env.PORT || 31000;

//app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(cors({ credentials: true, origin: true }))
app.use(helmet());

/**app setup here */
app.use(tokenAuthenticator); 		/**middleware setups here {40-50ms increase in response time} */
app.use(addRequestID); 				/**middleware setups here {1-2ms increase in response time} */ 
app.use(responseRequestID); 		/**middleware setups here {1-2ms increase in response time} */
app.use(modulePermisionChecker); 	/**middleware setups here */

/**app setup of API here */
app.use(api);

/**app listens to PORT*/
app.listen(
	PORT,
	console.log(`Server running on port ${PORT}; as of ${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`)
)

/**load DB here */
sequelize.sync()



/**load CRON here */
