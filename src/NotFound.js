import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
	return (
		<div className="not-found">
			<h1>404! Not Found</h1>
			<Link to="/"><button className="fixed-button">Go home</button></Link>
		</div>
	);
}

export default NotFound;
