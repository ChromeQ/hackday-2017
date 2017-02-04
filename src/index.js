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

		if (!lineup[team][0]) {
			lineup[team][0] = {...player, pos: 'DEF'};
		} else if (!lineup[team][1]) {
			lineup[team][1] = {...player, pos: 'ATT'};
		}

		this.setState({ lineup });
	}

	handlePlayerDeselected(player, team) {
		let lineup = {...this.state.lineup};

		if (lineup[team][0] && lineup[team][0].id === player.id) {
			lineup[team][0] = null;
		} else if (lineup[team][1] && lineup[team][1].id === player.id) {
			lineup[team][1] = null;
		}

		this.setState({ lineup });
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Squad} playerSelected={this.handlePlayerSelected.bind(this)} playerDeselected={this.handlePlayerDeselected.bind(this)} lineup={this.state.lineup} />
					<Route exact path="/match" component={App} lineup={this.state.lineup} />
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
