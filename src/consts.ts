import { SortingOption } from './types';

export const sortingOptions: SortingOption[] = [
	{ value: 'mileage-asc', label: 'Mileage: Low to High' },
	{ value: 'mileage-desc', label: 'Mileage: High to Low' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'distance-asc', label: 'Distance: Low to High' },
	{ value: 'distance-desc', label: 'Distance: High to Low' },
];
