import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Squad from './Squad';
import App from './App';
import NotFound from './NotFound';
import './index.css';

class Root extends Component {

	constructor() {
		super();

		this.state = {
			lineup: {
				home: [null, null],
				away: [null, null]
			}
		};
	}

	handlePlayerSelected(player, team) {
		let lineup = {...this.state.lineup};
		const players = lineup[team];

		if (!players[0]) {
			players[0] = {...player, pos: 'DEF'};
		} else if (!players[1]) {
			players[1] = {...player, pos: 'ATT'};
		}

		this.setState({ lineup });
	}

	handlePlayerDeselected(player, team) {
		let lineup = {...this.state.lineup};
		const players = lineup[team];

		if (players[0] && players[0].id === player.id) {
			players[0] = null;
		} else if (players[1] && players[1].id === player.id) {
			players[1] = null;
		}

		this.setState({ lineup });
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
					<Route exact path="/" component={Squad} playerSelected={this.handlePlayerSelected.bind(this)} playerDeselected={this.handlePlayerDeselected.bind(this)} lineup={this.state.lineup} />
					<Route exact path="/match" component={App} lineup={this.state.lineup} switchPlayers={this.handleSwitchPlayers.bind(this)}  />
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
