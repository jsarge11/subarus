import React from 'react';

interface SliderProps {
	value: number;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	minDistance: number;
}

const Slider: React.FC<SliderProps> = ({ value, handleChange, minDistance }) => {
	return (
		<div className="flex flex-col items-center justify-center mt-16">
			<label className="text-white mb-4 text-xl font-semibold text-gray-700" htmlFor="slider">
				Max Distance
			</label>
			<input
				className="w-64 h-2 bg-white rounded-lg appearance-none cursor-pointer slider-thumb"
				id="slider"
				max="2000"
				min={minDistance.toString()}
				type="range"
				value={value}
				onChange={handleChange}
			/>
			<div className="mt-4 text-2xl text-white">{value}</div>
		</div>
	);
};

export default Slider;
