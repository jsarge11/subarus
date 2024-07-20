/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VehicleDetails {
	vinNumber: string;
	dealerCode: string;
	year: number;
	make: string;
	modelName: string;
	trimCode: string;
	trimName: string;
	bodyStyle: string;
	transmission: string;
	stockNumber: string;
	msrp: number;
	internetPrice: number;
	mileage: number;
	engine: string;
	wheelBase: number;
	cityMpg: number;
	highwayMpg: number;
	dealership: string;
	detailsUrl: string;
	modelCode: string;
	category: string;
	exteriorColor: ColorDetails;
	interiorColor: ColorDetails;
	image: string;
	destinationFee: number;
	windowstickerUrl: string;
	options: string;
	cpoPrice: number;
	cpoInternetPrice: number | null;
	inTransit: boolean | null;
	keyFeatures: KeyFeature[];
	distance: number;
}

interface ColorDetails {
	code: string;
	hydrateValue: number;
	name: string;
	rgb: [number, number, number];
	default: boolean;
	msrp: number;
	interiorColors?: InteriorColor[];
	requiredPackages?: any[];
	map?: string[][];
	include360: boolean;
	foldedSeats: boolean;
	excludedPackages?: any[];
	['360Images']: { [key: string]: string };
	lightColor: boolean;
	colorChip?: string;
	colorChipPdfImage?: string;
}

interface InteriorColor {
	code: string;
	hydrateValue: number;
	name: string;
	rgb: [number, number, number];
	default: boolean;
	requiredPackages: any[];
	colorChip: string;
	map: string[][];
	include360: boolean;
	foldedSeats: boolean;
	colorChipPdfImage: string;
	excludedPackages: any[];
	['360Images']: { [key: string]: string };
	lightColor: boolean;
}

interface KeyFeature {
	code: string;
	name: string;
	description: string;
	optionality: string;
	value: string;
}

export interface Dealer {
	id: string;
	distance: number;
}

export type SortingValues =
	| 'mileage-asc'
	| 'mileage-desc'
	| 'price-asc'
	| 'price-desc'
	| 'distance-asc'
	| 'distance-desc';

export interface SortingOption {
	value: SortingValues;
	label: string;
}
