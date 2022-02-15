"use sctrict";

const router = require('express').Router();

const hwInboundService = require('../services/hw/inbound')

/**Converter to ASN HLS template */
router.post("/file-to-ASN", async(req, res) => {
	try {

		const {
			WarehouseID,
			fileName,
			valcon,
			userID } = req.query;

		const data = req.body.fromFront;

		if(valcon === 'ASNConvert') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_CIC_to_ASN({ data,
				WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNConvertCMIP') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_CIMP_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNPo') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_PO_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNsto') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_STO_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		throw new Error('Valcon error.')

	} catch (e) {
		res.status(500).json({
			message: `${e}`
		});
	}
});

/**Converter to ASN HLS template */
router.post("/file-to-ODO", async(req, res) => {
	try {

		const {
			WarehouseID,
			fileName,
			valcon,
			userID } = req.query;

		const data = req.body.fromFront;

		if(valcon === 'ASNConvert') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_CIC_to_ASN({ data,
				WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNConvertCMIP') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_CIMP_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNPo') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_PO_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		if(valcon === 'ASNsto') {
			const { outputFileName, outputFilePath } = await hwInboundService.convert_STO_to_ASN({ data,
						WarehouseID, fileName, valcon, userID });
			return res.download(outputFilePath);
		}

		throw new Error('Valcon error.')

	} catch (e) {
		res.status(500).json({
			message: `${e}`
		});
	}
});

module.exports = router;