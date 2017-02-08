import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'underscore';

import config from './config.json';
import Squad from './Squad';
import App from './App';
import NotFound from './NotFound';
import './index.css';

class Root extends Component {

	constructor() {
		super();

		this.state = {
			players: [],
			lineup: {
				home: [null, null],
				away: [null, null]
			}
		};
	}

	componentDidMount() {
		this.fetchPlayerList();
	}

	fetchPlayerList() {
		const url = `${config.api}/players`;

		fetch(url).then((res) => {
			res.json().then((json) => {
				if (!json.error) {
					let { players } = {...this.state};
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

	handlePlayerAdded() {
		this.fetchPlayerList();
	}

	handlePlayerSelected(index, team) {
		let { players, lineup } = {...this.state};
		const player = players[index];
		const teamHasSpace = !lineup[team][0] || !lineup[team][1];

		// Only proceed if the team has a free space
		if (teamHasSpace) {
			if (!lineup[team][0]) {
				lineup[team][0] = {...player, pos: 'DEF'};
			} else if (!lineup[team][1]) {
				lineup[team][1] = {...player, pos: 'ATT'};
			}

			players[index] = {...player, selected: true};

			this.setState({
				players,
			 	lineup
			});
		}
	}

	handlePlayerDeselected(player, team) {
		let { players, lineup } = {...this.state};
		const playerIndex = _.findIndex(players, (p) => {
			return p.id === player.id;
		});

		if (lineup[team][0] && lineup[team][0].id === players[playerIndex].id) {
			lineup[team][0] = null;
		} else if (lineup[team][1] && lineup[team][1].id === players[playerIndex].id) {
			lineup[team][1] = null;
		}

		players[playerIndex] = {...players[playerIndex], selected: false};

		this.setState({
			players,
			lineup
		});
	}

	handleSwitchPlayers(team) {
		let lineup = {...this.state.lineup};
		const players = lineup[team];

		if (players[0] && players[1]) {
			players.reverse();
			players[0] = {...players[0], pos: 'DEF'};
			players[1] = {...players[1], pos: 'ATT'};

			this.setState({ lineup });
		}
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Squad}
						lineup={this.state.lineup}
						players={this.state.players}
						playerAdded={this.handlePlayerAdded.bind(this)}
						playerSelected={this.handlePlayerSelected.bind(this)} playerDeselected={this.handlePlayerDeselected.bind(this)} />

					<Route exact path="/match" component={App}
						lineup={this.state.lineup}
						switchPlayers={this.handleSwitchPlayers.bind(this)}  />

					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
