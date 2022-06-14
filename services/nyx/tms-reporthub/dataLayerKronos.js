"use strict";

const models = require('../../../models/kronos');
const {sequelize,Sequelize} = models;

exports.getDFpick = async({
	TripIDpickArray
}) => {
	try {
		//const nullTripIDpickArray = TripIDpickArray||['']
		return await sequelize.query(
			`SELECT
			trp.trip_log_id				tripIDpick,
			t.name						TruckAssignment,	-- 11
			v.vehicle_id				PlateNo,			-- 12
			ed2.actual_datetime			ataPickLoc,			-- 13
			ed3.actual_datetime			ataInYard,			-- 17
			trp.trip_assignment_no		ContainerNo			-- 21
			FROM trip_header trp
			left JOIN vehicle v
						ON v.id=trp.fk_assigned_vehicle_id
			LEFT JOIN trucker t
						ON t.id=v.trucker_id
			LEFT JOIN event_detail ed2
						ON ed2.trip_log_id=trp.trip_log_id
						AND ed2.trip_leg=2
						AND ed2.event_description='Arrived'
			LEFT JOIN event_detail ed3
						ON ed3.trip_log_id=trp.trip_log_id
						AND ed3.trip_leg=3
						AND ed3.event_description='Arrived'
			WHERE
			trp.trip_log_id in (${TripIDpickArray.map(x => '\''+x+'\'').join(',')})`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}

exports.getDFline = async({
	TripIDlineArray
}) => {
	try {
		//const nullTripIDlineArray = TripIDlineArray||['']
		return await sequelize.query(
			`SELECT
			trp.trip_log_id			tripIDline,
			ss.voyage				Voyage,					-- 22
			ss.shipping_line		Carrier,				-- 23
			ss.departure_date		ETDoriginDate,			-- 24
			ss.departure_time		ETDoriginTime,			-- 24
			ed1.actual_datetime		ATDorigin,				-- 25
			ss.arrival_date		ETDdestDate,			-- 26
			ss.arrival_time		ETDdestTime,			-- 26
			ed2.actual_datetime		ATDdest					-- 27

			from
			trip_header trp
			LEFT JOIN event_detail ed1
						ON ed1.trip_log_id=trp.trip_log_id
						AND ed1.trip_leg=1
						AND ed1.event_description='Departed'
			LEFT JOIN event_detail ed2
						ON ed2.trip_log_id=trp.trip_log_id
						AND ed2.trip_leg=2
						AND ed2.event_description='Arrived'
			LEFT JOIN shipping_schedule ss
						ON ss.id=trp.fk_shipping_schedule_id
			WHERE
			trp.trip_log_id in (${TripIDlineArray.map(x => '\''+x+'\'').join(',')})`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}

exports.getDFdel = async({
	TripIDdelArray
}) => {
	try {
		//const nullTripIDdelArray = TripIDdelArray||['']
		return await sequelize.query(
			`SELECT
			trp.trip_log_id				tripIDdel,
			ed1.actual_datetime			ApulloutPier,		-- 29
			t.name							trucker,				-- 30
			v.vehicle_id					PlateNo,				-- 31
			ed2.actual_datetime			ADelConsignee,		-- 32
			trp.remarks						Remarks				-- 39 and 40
			from trip_header trp
			LEFT JOIN event_detail ed1
						ON ed1.trip_log_id=trp.trip_log_id
						AND ed1.trip_leg=1
						AND ed1.event_description='Departed'
			LEFT JOIN event_detail ed2
						ON ed2.trip_log_id=trp.trip_log_id
						AND ed2.trip_leg=2
						AND ed2.event_description='Arrived'
			left JOIN vehicle v
						ON v.id=trp.fk_assigned_vehicle_id
			LEFT JOIN trucker t
						ON t.id=v.trucker_id
			where
			trp.trip_log_id in (${TripIDdelArray.map(x => '\''+x+'\'').join(',')})`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}