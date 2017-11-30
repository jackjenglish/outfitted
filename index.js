import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import App from './components/App.js';
import {Route,HashRouter as Router,browserHistory,IndexRoute} from 'react-router-dom'
render((
	<Router >
		<div>
		<Route path="/" component={App}/>	
		</div>
	</Router>
	), document.getElementById('root'))