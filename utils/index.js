const axios = require('axios');
const baseUrl = `https://www.subaru.com/services/graphql/cpoinventory`;

const getDealers = async () => {
	const response = await axios.get(
		'https://www.subaru.com/services/dealers/distances/by/zipcode?zipcode=84097&count=215'
	);
	const closeDealers = response.data.filter((zip) => zip.distance < 2000);
	const dealers = closeDealers.map((dealer) => ({
		id: dealer.dealer.id,
		distance: dealer.distance,
	}));

	return dealers;
};

const getInventory = async (year, model, maxMileage, dealers) => {
	const ids = dealers.map((dealer) => dealer.id);
	const response = await axios(
		`${baseUrl}?year=${year}&models=${model}&maxMileage=${maxMileage}&dealerCode=${ids}&colorCategories=BLU,WHT,BLK&itemsPerPage=1000`
	);
	return {
		items: response.data.pagedListWrapper.items,
		dealers,
	};
};

module.exports = {
	getInventory,
	getDealers,
};
