import React, { Component } from 'react';

import config from './config';
import './ClaimGoal.css';

class ClaimGoal extends Component {

	handleClaimGoal(player, isOwnGoal) {
		const url = `${config.api}/goals/claim`;
		const data = {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		data.body = JSON.stringify({
			playerId: player.id,
			pos: player.pos,
			ownGoal: isOwnGoal
		});

		fetch(url, data);

		this.props.claimGoal(player);
	}

	render() {
		return (
			<div className="claim-goal-container">
				<div className="home-team">
					{this.props.players.home.map((player, i) => {
						const isOwnGoal = this.props.scoringTeam === 'away';

						return player ? (
							<button className={"claim-button" + (isOwnGoal ? " own-goal" : "")} key={i} onClick={() => { this.handleClaimGoal(player, isOwnGoal); }}>{isOwnGoal && <span>OG</span>}{player.name}</button>
						) : null;
					})}
				</div>
				<div className="away-team">
					{this.props.players.away.map((player, i) => {
						const isOwnGoal = this.props.scoringTeam === 'home';

						return player ? (
							<button className={"claim-button" + (isOwnGoal ? " own-goal" : "")} key={i} onClick={() => { this.handleClaimGoal(player, isOwnGoal); }}>{isOwnGoal && <span>OG</span>}{player.name}</button>
						) : null;
					})}
				</div>
			</div>
		);
	}
}

export default ClaimGoal;
