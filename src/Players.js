import React, { Component } from 'react';
import './Players.css';
import config from './config.json';

class Players extends Component {

	handleNewPlayerFocus() {
		this.newPlayerInput.value = '';
	}

	handleNewPlayerBlur() {
		const url = `${config.api}/player`;
		const data = {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		if (!this.newPlayerInput.value) {
			this.newPlayerInput.value = 'New Player';
		} else {
			data.body = JSON.stringify({ name: this.newPlayerInput.value });

			fetch(url, data).then((res) => {
				res.json().then((json) => {
					if (!json.error) {
						this.props.playerAdded();
						this.newPlayerInput.value = 'New Player';
					}
				});
			});
		}
	}

	render() {
		return (
			<ul className="players-list">
				{this.props.players.map((player, i) => {
					return (
						<li key={i}>
							{player.selected ? (
								<button className="player" disabled="disabled">{player.name}</button>
							) : (
								<button className="player" onClick={() => { this.props.playerSelected(i, this.props.team); }}>{player.name}</button>
							)}
						</li>
					);
				})}
				<li>
					<input className="new-player button" defaultValue="New player" ref={(input) => { this.newPlayerInput = input; }} onFocus={this.handleNewPlayerFocus.bind(this)} onBlur={this.handleNewPlayerBlur.bind(this)} />
				</li>
			</ul>
		);
	}
}

export default Players;
