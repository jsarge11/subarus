/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortingValues, TrimNames, VehicleDetails } from './types';

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

export const filterByYear = (year: string, data: VehicleDetails[]): VehicleDetails[] => {
	if (year === 'All' || !year) {
		return data;
	}

	const yearNumber = parseInt(year, 10);
	return data.filter((car) => car.year === yearNumber);
};

export const dealerships = [
	'Shortline Automotive',
	'Flatirons Subaru',
	'AutoNation Subaru Arapahoe',
	'Heuberger Subaru',
	'Cook Subaru',
	'Morehart Murphy Subaru',
	'Groove Subaru',
	'Dellenbach Motors',
	'Glenwood Springs Subaru',
	'AutoNation Subaru West',
	'Grand Junction Subaru',
	'Greeley Subaru',
	'Valley Subaru of Longmont',
	'Subaru of Loveland',
	'Flower Subaru',
	'Subaru of Pueblo',
	'Vista Subaru of Silverthorne',
	'Cook Craig Subaru',
	'Mike Shaw Subaru',
];

// Keywords to identify Colorado dealerships in URLs
export const dealershipKeywords = [
	'shortline',
	'flatirons',
	'arapahoe',
	'heuberger',
	'cook',
	'morehart',
	'murphy',
	'groove',
	'dellenbach',
	'glenwood',
	'grand-junction',
	'greeley',
	'longmont',
	'loveland',
	'flower',
	'pueblo',
	'silverthorne',
	'craig',
	'shaw',
];

/**
 * Checks if a URL contains any Colorado dealership keywords
 * @param url The URL to check
 * @returns True if the URL contains any Colorado dealership keywords
 */
export const isColoradoDealership = (url: string): boolean => {
	const lowercaseUrl = url.toLowerCase();
	return dealershipKeywords.some(keyword => lowercaseUrl.includes(keyword));
};

/**
 * Filters vehicles by Colorado dealerships
 * @param showOnlyColorado Whether to show only Colorado dealerships
 * @param data Array of vehicle details
 * @returns Filtered array of vehicle details
 */
export const filterByColoradoDealerships = (showOnlyColorado: boolean, data: VehicleDetails[]): VehicleDetails[] => {
	if (!showOnlyColorado) return data;
	return data.filter(car => isColoradoDealership(car.detailsUrl));
};
