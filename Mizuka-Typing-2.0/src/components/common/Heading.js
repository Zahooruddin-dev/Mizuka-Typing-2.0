import React from 'react';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';

const Heading = ({ isFocusedMode }) => {
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
				flow effortlessly with Mizuka's elegant typing experience.
			</span>
			<br />
			<span className='sub-header'>
				Remember: Every keystroke brings you closer to mastery. Embrace the journey.		
			</span>
		</div>
	);
};

export default Heading;
