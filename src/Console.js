import React from 'react';
import './Console.css';

const Console = (props) => {
	if (props.message === 'GOAL!!!') {
		return <div className="console goal">{props.message}</div>;
	} else {
		return <div className="console">{props.message}</div>;
	}
}

export default Console;
