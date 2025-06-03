const { getInventory, getDealers } = require('../utils');

const getCars = async (year) => {
	const dealers = await getDealers();
	// Use the provided year or default to 2024 if not specified
	const yearToUse = year || 2024;
	const inventory = await getInventory(yearToUse, 'CTK', 30000, dealers);

	return inventory;
};

exports.handler = async (event) => {
	try {
		// Extract year from query parameters if available
		const queryParams = event.queryStringParameters || {};
		const year = queryParams.year ? parseInt(queryParams.year, 10) : null;

		const data = await getCars(year);
		return {
			body: JSON.stringify({ data }),
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};
	} catch (err) {
		console.error('Error:', err);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Server error' }),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};
	}
};
