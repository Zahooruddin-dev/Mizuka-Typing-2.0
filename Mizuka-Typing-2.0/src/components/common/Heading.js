import React from 'react';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';

const Logo = ({ isFocusedMode }) => {
	return (
		<div
			className='header'
			style={{ visibility: isFocusedMode ? 'hidden' : 'visible' }}
		>
			<h1>
				Mizuka Types <KeyboardAltIcon fontSize='large' />
			</h1>
			<span className='sub-header'>
				Immerse yourself in the art of typing. Just start, and let your words
				flow effortlessly with Mizuak's elegant typing experience
			</span>
		</div>
	);
};

export default Logo;
