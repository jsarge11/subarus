import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, useMemo } from 'react';
import { CarCard } from './car-card';
import { Dealer, SortingValues, VehicleDetails } from './types';
import { sortingOptions, trimOptions, yearOptions } from './consts';
import Dropdown from './sorting-dropdown';
import { filterByTrim, sortOnValue, filterByYear, filterByColoradoDealerships } from './utils';
import { Loader } from './loader';

export const Main: React.FC = () => {
	const [subarus, setSubarus] = useState<VehicleDetails[]>([]);
	const [filteredSubarus, setFilteredSubarus] = useState<VehicleDetails[]>([]);

	const [selectedOption, setSelectedOption] = useState<string>(sortingOptions[1].value);
	const [trimFilter, setTrimFilter] = useState<string>('All');
	const [yearFilter, setYearFilter] = useState<string>('All');
	const [showOnlyColorado, setShowOnlyColorado] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [value, setValue] = useState(600);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = Number(e.target.value);
		setValue(newValue);
	};

	const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value as SortingValues);
	};

	useEffect(() => {
		setLoading(true);
		// Only send the year parameter if a specific year is selected (not 'All')
		const params = yearFilter !== 'All' ? { year: yearFilter } : {};

		axios
			.get('.netlify/functions/subarus', { params })
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
			.catch((error) => {
				console.error('Error fetching data:', error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [yearFilter]);

	const sortedSubarus = useMemo(() => {
		return sortOnValue(selectedOption as SortingValues, filteredSubarus);
	}, [selectedOption, filteredSubarus]);

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setTrimFilter(event.target.value);
	};

	const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setYearFilter(event.target.value);
	};

	const handleColoradoChange = (event: ChangeEvent<HTMLInputElement>) => {
		setShowOnlyColorado(event.target.checked);
	};

	useEffect(() => {
		const filteredByTrim = filterByTrim(trimFilter, subarus);
		const filteredByYear = filterByYear(yearFilter, filteredByTrim);
		const filteredByColorado = filterByColoradoDealerships(showOnlyColorado, filteredByYear);
		const filtered = filteredByColorado.filter((car) => car.distance <= value);
		setFilteredSubarus(filtered);
	}, [trimFilter, yearFilter, value, subarus, showOnlyColorado]);

	const filteredByTrim = filterByTrim(trimFilter, subarus);
	const minDistance = Math.min(...filteredByTrim.map((car) => car.distance));

	return (
		<div className="bg-slate-500 min-h-screen pb-10">
			<div className="bg-gradient-to-r from-blue-800 to-blue-600 py-6 shadow-lg mb-6">
				<div className="container mx-auto px-6">
					<h1 className="text-3xl md:text-4xl font-bold text-white text-center">
						Subaru Crosstrek Finder
					</h1>
				</div>
			</div>
			<div className="container mx-auto px-4 sm:px-6">
				{/* Filter controls section with improved layout */}
				<div className="bg-slate-600 rounded-lg p-4 sm:p-6 mb-8 shadow-md">
					{/* First row with total count and Colorado filter */}
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5 pb-4 border-b border-slate-500">
						{/* Total count with badge styling */}
						{!loading && (
							<div className="bg-blue-700 text-white px-4 py-2 rounded-full font-medium w-full sm:w-auto text-center sm:text-left">
								Total Vehicles: <span className="font-bold">{sortedSubarus?.length}</span>
							</div>
						)}
						
						{/* Colorado dealership filter */}
						<div className="flex items-center bg-slate-700 px-4 py-2 rounded-full w-full sm:w-auto">
							<input
								checked={showOnlyColorado}
								className="h-5 w-5 text-blue-600 rounded"
								id="colorado-filter"
								type="checkbox"
								onChange={handleColoradoChange}
							/>
							<label className="ml-2 text-white flex-grow" htmlFor="colorado-filter">
								Colorado Dealerships Only
							</label>
						</div>
					</div>
					
					{/* Dropdowns section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
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
						<Dropdown
							label="Year"
							options={yearOptions}
							selectedOption={yearFilter}
							onChange={handleYearChange}
						/>
					</div>
					
					{/* Distance slider */}
					<div className="bg-slate-700 rounded-lg p-4">
						<div className="flex items-center justify-between mb-2">
							<label className="text-white font-medium" htmlFor="slider">
								Max Distance:
							</label>
							<span className="text-white font-medium bg-blue-700 px-3 py-1 rounded-full text-sm">
								{value} miles
							</span>
						</div>
						<input
							className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer slider-thumb"
							id="slider"
							max="2000"
							min={minDistance.toString()}
							type="range"
							value={value}
							onChange={handleChange}
						/>
						<div className="flex justify-between text-xs text-slate-300 mt-1">
							<span>{minDistance} mi</span>
							<span>2000 mi</span>
						</div>
					</div>
				</div>
			</div>
			{/* Content rendering based on state */}
			{loading && <Loader />}

			{!loading && sortedSubarus.length === 0 && (
				<div className="container mx-auto p-6 flex justify-center items-center">
					<div className="bg-white p-8 rounded-lg shadow-md text-center">
						<h2 className="text-2xl font-bold text-gray-800 mb-2">No Vehicles Found</h2>
						<p className="text-gray-600">
							Try adjusting your filters to see more results.
						</p>
					</div>
				</div>
			)}

			{!loading && sortedSubarus.length > 0 && (
				<div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedSubarus.map((car, index) => (
						<CarCard key={index} {...car} />
					))}
				</div>
			)}
		</div>
	);
};
