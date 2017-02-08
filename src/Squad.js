import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from './config.json';
import Players from './Players';
import Lineup from './Lineup';
import './Squad.css';

class Squad extends Component {

	handleClickPlay() {
		const url = `${config.api}/match`;
		const data = {
			method: 'POST'
		}

		fetch(url, data).then((res) => {
			res.json().then((json) => {
				console.log(`Match ID: ${json.id}`);
			})
		});
	}

	render() {
		const { lineup } = this.props;
		const ready = lineup.home[0] && lineup.home[1] && lineup.away[0] && lineup.away[1];

		return (
			<div className="squad-container">
				<div className="home-team">
					<Players
						players={this.props.players}
						playerAdded={this.props.playerAdded}
						playerSelected={this.props.playerSelected}
						team="home" />
				</div>

				<Lineup lineup={this.props.lineup} playerDeselected={this.props.playerDeselected} />

				<div className="away-team">
					<Players
						players={this.props.players}
						playerAdded={this.props.playerAdded}
						playerSelected={this.props.playerSelected}
						team="away" />
				</div>

				{ready ? (
					<Link to="/match"><button className="fixed-button" onClick={this.handleClickPlay}>Play!</button></Link>
				) : (
					<button className="fixed-button" disabled="disabled">Play!</button>
				)}
			</div>
		);
	}
}

export default Squad;
