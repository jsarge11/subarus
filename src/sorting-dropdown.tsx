import React from 'react';
import { DropdownOption } from './types';

interface DropdownProps {
	label: string;
	selectedOption: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	options: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({ onChange, options, selectedOption, label }) => {
	return (
		<div className="relative inline-block text-left ml-36 mt-10">
			<p className="text-white">{label}</p>
			<select
				className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
				value={selectedOption}
				onChange={onChange}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
