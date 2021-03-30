import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import HomePage from "./homePage";
import LoginPage from "./loginPage";

export default function App() {

	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/auth" exact component={LoginPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}
