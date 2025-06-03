import React from 'react';
import { VehicleDetails } from './types';
import { formatNumber } from './utils';

export const CarCard: React.FC<VehicleDetails> = ({
	image,
	mileage,
	internetPrice,
	trimName,
	detailsUrl,
	distance,
	exteriorColor,
	year,
}) => {
	return (
		<a
			className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
			href={detailsUrl}>
			<img alt={`Image of ${name}`} className="w-full h-48 object-cover" src={image} />
			<div className="p-6">
				<p className="text-gray-700 mb-2">Mileage: {formatNumber(mileage)}</p>
				<p className="text-gray-700 mb-2">Price: ${formatNumber(internetPrice)}</p>
				<p className="text-gray-700 mb-2">Trim: {trimName}</p>
				<p className="text-gray-700 mb-2">Distance: {distance} miles</p>
				<p className="text-gray-700 mb-2">Year: {year}</p>
				{exteriorColor && <p className="text-gray-700">Color: {exteriorColor?.name}</p>}
			</div>
		</a>
	);
};
