import React, { Component } from 'react';

import config from './config';
import './ClaimGoal.css';

class ClaimGoal extends Component {

	handleClaimGoal(player) {
		const url = `${config.api}/goals/claim`;
		const data = {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		data.body = JSON.stringify({
			playerId: player.id,
			pos: player.pos
		});

		fetch(url, data);

		this.props.claimGoal(player);
	}

	render() {
		return (
			<div className="claim-goal-container">
				<div className="home-team">
					{this.props.players.home.map((player, i) => {
						return player ? (
							<button className="claim-button" key={i} onClick={() => { this.handleClaimGoal(player); }}>{player.name}</button>
						) : null;
					})}
				</div>
				<div className="home-team">
					{this.props.players.away.map((player, i) => {
						return player ? (
							<button className="claim-button" key={i} onClick={() => { this.handleClaimGoal(player); }}>{player.name}</button>
						) : null;
					})}
				</div>
			</div>
		);
	}
}

export default ClaimGoal;
