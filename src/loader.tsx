import React from 'react';

export const Loader: React.FC = () => {
	return (
		<div className="flex justify-center items-start h-screen mt-48">
			<div className="w-48 h-48 border-4 border-white-500 border-dotted rounded-full animate-spin"></div>
		</div>
	);
};
