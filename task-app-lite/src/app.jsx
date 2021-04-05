import React from "react";
import decode from "jwt-decode";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./homePage";
import LoginPage from "./loginPage";

export default function App() {
    function isLoggedIn() {
        const token = localStorage.getItem("token") || null;
        if (!token) return false;
        const { exp } = decode(token);
        if (exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            window.location.reload();
        }

        return true;
    }


    return (
        <div id="app" className="app">
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) =>
                            isLoggedIn() ? (
                                <HomePage/>
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/auth",
                                    }}
                                />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/homePage"
                        render={() =>
                            isLoggedIn() ? (
                                <HomePage />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/auth",
                                    }}
                                />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/auth"
                        render={() =>
                            isLoggedIn() ? (
                                <Redirect
                                    to={{
                                        pathname: "/homePage",
                                    }}
                                />
                            ) : (
                               <LoginPage/> 
                            )
                        }
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
