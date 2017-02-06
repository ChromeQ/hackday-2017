import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import _ from 'underscore';

import config from './config.json';
import './App.css';
import Team from './Team';
import Score from './Score';
import ClaimGoal from './ClaimGoal';
import Console from './Console';

class App extends Component {

	constructor() {
		super();

		this.state = {
			team1score: 0,
			team2score: 0,
			message: null
		};
	}

	componentDidMount() {
		const url = `${config.apiRoot}/scores`;
		const socket = io(url);

		socket.on('connect', this.setInitialScore.bind(this));
		socket.on('scores', this.handleGoalScored.bind(this));
	}

	setInitialScore(data) {
		if (data) {
			const state = _.extend({...this.state}, data);

			this.setState(state);
		}
	}

	handleGoalScored(data) {
		const state = _.extend({...this.state}, data);
		const lineup = this.props.lineup;

		state.message = 'GOAL!!!';

		this.setState(state);

		if (!lineup.home[0] && !lineup.home[1] && !lineup.away[0] && !lineup.away[1]) {
			setTimeout(() => {
				state.message = null;
				this.setState(state);
			}, 3500);
		}
	}

	handleClaimGoal(player) {
		let message = {...this.state.message};

		message = `Goal scored by ${player.name}!`;

		this.setState({ message });

		setTimeout(() => {
			message = null;
			this.setState({ message });
		}, 3500);
	}

	render() {
		return (
			<div className="app">
				<Team players={this.props.lineup.home} switchPlayers={this.props.switchPlayers.bind(this)} team="home" />
				<Score homeScore={this.state.team1score} awayScore={this.state.team2score} />
				<Team players={this.props.lineup.away} switchPlayers={this.props.switchPlayers.bind(this)} team="away" />

				<Console message={this.state.message} />
				{this.state.message === 'GOAL!!!' ? (
					<ClaimGoal players={this.props.lineup} claimGoal={this.handleClaimGoal.bind(this)} />
				) : null}

				<Link to="/"><button className="fixed-button">Restart</button></Link>
			</div>
		);
	}
}

export default App;
