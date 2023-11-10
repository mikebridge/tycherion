import React from 'react';
import {Routes, Route} from 'react-router-dom';

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
                <Routes>
                    {/*<Route path="/">*/}
                    {/*    <SearchSelector></SearchSelector>*/}
                    {/*</Route>*/}
                    <Route index element={<SelectApp />} />
                    <Route path="/suggest" element={<Suggest />} />
                    {/*<Route path="/suggest/:slug">{*/}
                    {/*    (props: any) =>*/}
                    {/*        props?.match?.params.slug ?*/}
                    {/*            (<SuggestedResult slug={props.match.params.slug}/>)*/}
                    {/*            : <div>not found!</div>*/}
                    {/*}*/}
                    <Route path="/suggest/:slug" element={<SuggestedResult />} />
                    <Route path="/search" element={<Search/>} />

                </Routes>
            </div>
        </div>
        <Footer />
        {/*{<Redirect exact from="/" to="/suggest" />}*/}
    </div>
);

export default App;
