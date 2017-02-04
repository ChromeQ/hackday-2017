import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import './Score.css';

class Score extends Component {
	render() {
		return (
			<div className="score-container">
				<CSSTransitionGroup
					component="div"
					className="home-score"
					transitionName="score"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
				>
					<span key={this.props.homeScore}>{ this.props.homeScore }</span>
				</CSSTransitionGroup>
				<div className="score-separator">-</div>
				<CSSTransitionGroup
					component="div"
					className="away-score"
					transitionName="score"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
				>
					<span key={this.props.awayScore}>{ this.props.awayScore }</span>
				</CSSTransitionGroup>
			</div>
		);
	}
}

export default Score;
