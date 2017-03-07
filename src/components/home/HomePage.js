import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
	return (
		<div className="jumbotron">
			<h1>ChatX</h1>
			<p>This is a prototype version of a chat.</p>
			<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
		</div>
	);
};

export default HomePage;
