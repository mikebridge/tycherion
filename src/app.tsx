import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {NavBar} from "./main/navBar";
import {Suggest} from "./main/suggest";

import {Footer} from "./main/footer";
import {SuggestedResult} from "./main/suggestedResult";
import { SelectApp } from './selectApp';
import {Search} from "./main/search";
import "./app.css";

const App = () => (
    <div className="app">
        <NavBar/>
        <div className="page">
            <div className="content">
                <Switch>
                    {/*<Route path="/">*/}
                    {/*    <SearchSelector></SearchSelector>*/}
                    {/*</Route>*/}
                    <Route exact path="/">
                        <SelectApp />
                    </Route>
                    <Route exact path="/suggest">
                        <Suggest/>
                    </Route>
                    <Route path="/suggest/:slug">{
                        (props) =>
                            props?.match?.params.slug ?
                                (<SuggestedResult slug={props.match.params.slug}/>)
                                : <div>not found!</div>
                    }
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>
                </Switch>
            </div>
        </div>
        <Footer />
        {/*{<Redirect exact from="/" to="/suggest" />}*/}
    </div>
);

export default App;
