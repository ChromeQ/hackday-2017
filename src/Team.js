import React from 'react';
import './Team.css';

const Team = (props) => {
	const players = props.players;

	return (
		<div className="team-container">
			<h4>DEF</h4>
			{players[0] && players[0].name ? (
				<div className="team-player">{players[0].name.toUpperCase()}</div>
			) : (
				<div className="empty team-player">Player 1</div>
			)}

			<h4>ATT</h4>
			{players[1] && players[1].name ? (
				<div className="team-player">{players[1].name.toUpperCase()}</div>
			) : (
				<div className="empty team-player">Player 2</div>
			)}
		</div>
	);
}

export default Team;
