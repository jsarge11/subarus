import { DropdownOption } from './types';

export const sortingOptions: DropdownOption[] = [
	{ value: 'mileage-asc', label: 'Mileage: Low to High' },
	{ value: 'mileage-desc', label: 'Mileage: High to Low' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'distance-asc', label: 'Distance: Low to High' },
	{ value: 'distance-desc', label: 'Distance: High to Low' },
];

export const trimOptions: DropdownOption[] = [
	{ value: 'All', label: 'All' },
	{ value: 'Sport', label: 'Sport' },
	{ value: 'Premium', label: 'Premium' },
	{ value: 'Limited', label: 'Limited' },
	{ value: 'Wilderness', label: 'Wilderness' },
];

export const yearOptions: DropdownOption[] = [
	{ value: 'All', label: 'All Years' },
	{ value: '2024', label: '2024' },
	{ value: '2023', label: '2023' },
	{ value: '2022', label: '2022' },
	{ value: '2021', label: '2021' },
	{ value: '2020', label: '2020' },
];
