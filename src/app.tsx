import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {NavBar} from "./main/navBar";
import {Suggest} from "./main/suggest";

import {Footer} from "./main/footer";
import {SuggestedResult} from "./main/suggestedResult";
import { SelectApp } from './selectApp';
import {Search} from "./main/search";
import "./app.css";

const Switch2 = Switch as any;
const Route2 = Route as any;

const App = () => (
    <div className="app">
        <NavBar/>
        <div className="page">
            <div className="content">
                <Switch2>
                    {/*<Route path="/">*/}
                    {/*    <SearchSelector></SearchSelector>*/}
                    {/*</Route>*/}
                    <Route2 exact path="/">
                        <SelectApp />
                    </Route2>
                    <Route2 exact path="/suggest">
                        <Suggest/>
                    </Route2>
                    <Route2 path="/suggest/:slug">{
                        (props: any) =>
                            props?.match?.params.slug ?
                                (<SuggestedResult slug={props.match.params.slug}/>)
                                : <div>not found!</div>
                    }
                    </Route2>
                    <Route2 path="/search">
                        <Search/>
                    </Route2>
                </Switch2>
            </div>
        </div>
        <Footer />
        {/*{<Redirect exact from="/" to="/suggest" />}*/}
    </div>
);

export default App;
