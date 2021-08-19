import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {NavBar} from "./main/navBar";
import {MovieSelector} from "./main/movieSelector";
import {Search} from "./main/search"
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
    <>
        <NavBar/>
        <Switch>
            <Route path="/suggest">
                <MovieSelector/>
            </Route>
            <Route path="/search">
                <Search/>
            </Route>
        </Switch>
        <Redirect exact from="/" to="suggest" />
    </>
);

export default App;
