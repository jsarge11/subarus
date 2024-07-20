import React from 'react';
import { SortingOption } from './types';

interface SortingDropdownProps {
	selectedOption: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	sortingOptions: SortingOption[];
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({
	onChange,
	sortingOptions,
	selectedOption,
}) => {
	return (
		<div className="relative inline-block text-left ml-36 mt-10">
			<select
				className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
				value={selectedOption}
				onChange={onChange}>
				{sortingOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pr-2">
				<svg
					className="h-5 w-5 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 20 20">
					<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
				</svg>
			</div>
		</div>
	);
};

export default SortingDropdown;
