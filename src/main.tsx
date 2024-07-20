import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, useMemo } from 'react';
import { CarCard } from './car-card';
import { Dealer, SortingValues, VehicleDetails } from './types';
import { sortingOptions } from './consts';
import SortingDropdown from './sorting-dropdown';
import { sortOnValue } from './utils';

export const Main = () => {
	const [subarus, setSubarus] = useState<VehicleDetails[]>([]);

	const [selectedOption, setSelectedOption] = useState<SortingValues>(sortingOptions[0].value);
	const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value as SortingValues);
	};

	useEffect(() => {
		axios.get('.netlify/functions/subarus').then((res) => {
			const subarus = res.data.data.items as VehicleDetails[];
			const dealers = res.data.data.dealers as Dealer[];
			const subarusWithDealers = subarus.map((subaru) => {
				const dealer = dealers.find((dealer) => dealer.id === subaru.dealerCode);
				return {
					...subaru,
					distance: Math.floor(dealer?.distance),
				};
			});

			setSubarus(subarusWithDealers);
		});
	}, []);

	const sortedSubarus = useMemo(() => {
		return sortOnValue(selectedOption, subarus);
	}, [selectedOption, subarus]);

	return (
		<div className="bg-slate-500">
			<SortingDropdown
				selectedOption={selectedOption}
				sortingOptions={sortingOptions}
				onChange={handleSortChange}
			/>

			<div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sortedSubarus.map((car, index) => (
					<CarCard key={index} {...car} />
				))}
			</div>
		</div>
	);
};
