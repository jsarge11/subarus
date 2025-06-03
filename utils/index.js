const axios = require('axios');
const baseUrl = `https://www.subaru.com/services/graphql/cpoinventory`;

const getDealers = async () => {
	const response = await axios.get(
		'https://www.subaru.com/services/dealers/distances/by/zipcode?zipcode=84097&count=215'
	);
	const closeDealers = response.data.filter((zip) => zip.distance < 650);
	const dealers = closeDealers.map((dealer) => ({
		id: dealer.dealer.id,
		distance: dealer.distance,
	}));

	return dealers;
};

const getInventory = async (year, model, maxMileage, dealers) => {
	const ids = dealers.map((dealer) => dealer.id);
	const url = `${baseUrl}?year=${year}&models=${model}&maxMileage=${maxMileage}&dealerCode=${ids}&itemsPerPage=1000`;

	const response = await axios.get(url);
	return {
		items: response.data.pagedListWrapper.items,
		dealers,
	};
};

module.exports = {
	getInventory,
	getDealers,
};
