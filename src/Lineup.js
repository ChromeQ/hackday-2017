import React, { Component } from 'react';

import './Lineup.css';

class Lineup extends Component {
	render() {
		const homeTeam = this.props.lineup.home;
		const awayTeam = this.props.lineup.away;

		return (
			<div className="lineup-container">
				<div className="home-team">
					<h2>Red team</h2>

					<div className="lineup">
						<h4>DEF</h4>
						{this.props.lineup.home[0] ? (
							<div className="playerSlot" onClick={() => { this.props.playerDeselected(homeTeam[0], 'home'); }}>{homeTeam[0].name}</div>
						) : (
							<div className="empty playerSlot">&nbsp;</div>
						)}

						<h4>ATT</h4>
						{this.props.lineup.home[1] ? (
							<div className="playerSlot" onClick={() => { this.props.playerDeselected(homeTeam[1], 'home'); }}>{homeTeam[1].name}</div>
						) : (
							<div className="empty playerSlot">&nbsp;</div>
						)}
					</div>

				</div>

				<span className="lineup-separator">v</span>

				<div className="away-team">
					<h2>White team</h2>

					<div className="lineup">
						<h4>DEF</h4>
						{this.props.lineup.away[0] ? (
							<div className="playerSlot" onClick={() => { this.props.playerDeselected(awayTeam[0], 'away'); }}>{awayTeam[0].name}</div>
						) : (
							<div className="empty playerSlot">&nbsp;</div>
						)}

						<h4>ATT</h4>
						{this.props.lineup.away[1] ? (
							<div className="playerSlot" onClick={() => { this.props.playerDeselected(awayTeam[1], 'away'); }}>{awayTeam[1].name}</div>
						) : (
							<div className="empty playerSlot">&nbsp;</div>
						)}
					</div>

				</div>
			</div>
		);
	}
}

export default Lineup;
