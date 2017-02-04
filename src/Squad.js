import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';

import config from './config.json';
import Players from './Players';
import Lineup from './Lineup';
import './Squad.css';

class Squad extends Component {

	constructor() {
		super();

		this.state = {
			players: []
		}
	}

	componentDidMount() {
		this.fetchPlayerList();
	}

	handleNewPlayerAdded() {
		this.fetchPlayerList();
	}

	handlePlayerSelected(player, team) {
		let players = [...this.state.players];
		const playerIndex = _.findIndex(players, (p) => {
			return p.id === player.id;
		});
		const teamSize = _.compact(this.props.lineup[team]).length;

		// Do not do anything more if the team is full
		if (teamSize < 2) {
			players[playerIndex] = {...players[playerIndex], selected: true};
			this.setState({ players });

			this.props.playerSelected(player, team);
		}
	}

	handlePlayerDeselected(player, team) {
		let players = [...this.state.players];
		const playerIndex = _.findIndex(players, (p) => {
			return p.id === player.id;
		});

		players[playerIndex] = {...players[playerIndex], selected: false};
		this.setState({ players });

		this.props.playerDeselected(player, team);
	}

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

	fetchPlayerList() {
		const url = `${config.api}/players`;

		fetch(url).then((res) => {
			res.json().then((json) => {
				if (!json.error) {
					let players = [...this.state];
					let names = {};

					json.players = json.players.map((player) => {
						const name = player.name.toLowerCase();

						if (!names[name]) {
							names[name] = true;
							return player;
						}

						return null;
					});

					players = _.compact(json.players);
					this.setState({ players });
				}
			});
		});
	}

	render() {
		const lineup = this.props.lineup;
		const ready = lineup.home[0] && lineup.home[1] && lineup.away[0] && lineup.away[1];

		return (
			<div className="list-container">
				<div className="home-team">
					<Players players={this.state.players} newPlayerAdded={this.handleNewPlayerAdded.bind(this)} playerSelected={this.handlePlayerSelected.bind(this)} team="home" />
				</div>

				<Lineup lineup={this.props.lineup} playerDeselected={this.handlePlayerDeselected.bind(this)} />

				<div className="away-team">
					<Players players={this.state.players} newPlayerAdded={this.handleNewPlayerAdded.bind(this)} playerSelected={this.handlePlayerSelected.bind(this)} team="away" />
				</div>

				{ready ? (
					<Link to="/match"><button className="fixed-button" onClick={this.handleClickPlay.bind(this)}>Play!</button></Link>
				) : (
					<button className="fixed-button" disabled="disabled">Play!</button>
				)}
			</div>
		);
	}
}

export default Squad;
