'use strict';
const express  = require('express');
const Sequelize = require('sequelize');

const {hwConfig} = require('./config/config');


	try {
		const {username, password, database} = hwConfig;

		console.log(hwConfig);
      let twb_sequelize = new Sequelize(hwConfig);
		 twb_sequelize.authenticate();
		console.log('Successfully established a connection to twb Database.');
	}
	catch(e){
		console.log(e)
	}

