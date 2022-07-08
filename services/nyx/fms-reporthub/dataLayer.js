"use strict";

const models = require('../../../models/scmdb_wms');
const {sequelize, Sequelize} = models;

exports.sp_salem_sample_cdi = async({
	dateFrom
}) => {
	try {
		return await sequelize.query(
			`SELECT
				pd.wms_pway_po_no 'primary Ref Doc',
				asn.wms_asn_sent_by,
				greh.wms_gr_exec_no 'grn no',
				SUM(i.wms_ex_itm_quantity) 'putaway qty',
				SUM(pd.wms_pway_allocated_qty/i.wms_ex_itm_quantity) 'case equivalent'
				,wms_pway_created_date
				--,ph.*
				--,pd.*
				,wms_pway_created_by
					
			FROM wms_putaway_exec_dtl ph

			LEFT JOIN wms_put_plan_item_dtl pd ON ph.wms_pway_loc_code = pd.wms_pway_loc_code
							AND ph.wms_pway_pln_no = pd.wms_pway_pln_no

			LEFT JOIN wms_asn_header asn ON asn.wms_asn_prefdoc_no = pd.wms_pway_po_no

			LEFT JOIN wms_gr_exec_dtl greh ON greh.wms_gr_no = pd.wms_pway_gr_no

			LEFT JOIN wms_ex_itm_su_conversion_dtl i ON i.wms_ex_itm_loc_code = ph.wms_pway_loc_code
							AND i.wms_ex_itm_storage_unit = 'CASE'
							AND i.wms_ex_itm_code = pd.wms_pway_item

			where ph.wms_pway_loc_code = 'ZEU-TWB'
				AND ph.wms_pway_exec_status = 'CMPLTD'
				AND pd.wms_pway_allocated_bin like '%NOLOC%'

			GROUP BY wms_pway_po_no
				,wms_asn_sent_by
				,wms_pway_created_date
				,greh.wms_gr_exec_no
				,wms_pway_created_by

			ORDER BY wms_pway_created_date asc`,
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
