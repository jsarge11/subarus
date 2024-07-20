const { getInventory, getDealers } = require('../utils');

const getCars = async () => {
	const dealers = await getDealers();
	const inventory = await getInventory(2024, 'CTK', 30000, dealers);

	return inventory;
};

exports.handler = async () => {
	try {
		const data = await getCars();
		return {
			body: JSON.stringify({ data }),
			statusCode: 200,
		};
	} catch (err) {
		return {
			statusCode: 500,
			err,
		};
	}
};
