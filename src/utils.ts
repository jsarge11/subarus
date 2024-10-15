import { SortingValues, VehicleDetails } from './types';

export const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const sortOnValue = (value: SortingValues, data: VehicleDetails[]): VehicleDetails[] => {
	return data.sort((a, b) => {
		if (value === 'mileage-asc') {
			return a.mileage - b.mileage;
		} else if (value === 'mileage-desc') {
			return b.mileage - a.mileage;
		} else if (value === 'price-asc') {
			return a.internetPrice - b.internetPrice;
		} else if (value === 'price-desc') {
			return b.internetPrice - a.internetPrice;
		} else if (value === 'distance-asc') {
			return a.distance - b.distance;
		} else if (value === 'distance-desc') {
			return b.distance - a.distance;
		}
		return 0;
	});
};

export const filterByTrim = (trim: string, data: VehicleDetails[]): VehicleDetails[] => {
	if (trim === 'All' || !trim) {
		return data;
	}

	return data.filter((car) => car.trimName === trim);
};
