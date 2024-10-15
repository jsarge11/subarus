import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, useMemo } from 'react';
import { CarCard } from './car-card';
import { Dealer, SortingValues, VehicleDetails } from './types';
import { sortingOptions, trimOptions } from './consts';
import Dropdown from './sorting-dropdown';
import { filterByTrim, sortOnValue } from './utils';
import { Loader } from './loader';
import Slider from './slider';

export const Main: React.FC = () => {
	const [subarus, setSubarus] = useState<VehicleDetails[]>([]);
	const [filteredSubarus, setFilteredSubarus] = useState<VehicleDetails[]>([]);

	const [selectedOption, setSelectedOption] = useState<string>(sortingOptions[1].value);
	const [trimFilter, setTrimFilter] = useState<string>('Wilderness');
	const [loading, setLoading] = useState<boolean>(true);

	const [value, setValue] = useState(2000);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = Number(e.target.value);
		setValue(newValue);
	};

	const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value as SortingValues);
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get('.netlify/functions/subarus')
			.then((res) => {
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
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const sortedSubarus = useMemo(() => {
		return sortOnValue(selectedOption as SortingValues, filteredSubarus);
	}, [selectedOption, filteredSubarus]);

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setTrimFilter(event.target.value);
	};

	useEffect(() => {
		const filteredByTrim = filterByTrim(trimFilter, subarus);
		const filtered = filteredByTrim.filter((car) => car.distance <= value);
		setFilteredSubarus(filtered);
	}, [trimFilter, value, subarus]);

	const filteredByTrim = filterByTrim(trimFilter, subarus);
	const minDistance = Math.min(...filteredByTrim.map((car) => car.distance));

	return (
		<div className="bg-slate-500">
			<p className="text-white ml-36 pt-10">Total: {sortedSubarus?.length}</p>
			<Dropdown
				label="Sort"
				options={sortingOptions}
				selectedOption={selectedOption}
				onChange={handleSortChange}
			/>
			<Dropdown
				label="Trim"
				options={trimOptions}
				selectedOption={trimFilter}
				onChange={handleFilterChange}
			/>

			<Slider handleChange={handleChange} minDistance={minDistance} value={value} />
			{loading ? (
				<Loader />
			) : (
				<div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedSubarus.map((car, index) => (
						<CarCard key={index} {...car} />
					))}
				</div>
			)}
		</div>
	);
};
