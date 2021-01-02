import {Button, Container, Jumbotron, Navbar} from "reactstrap";
import React from "react";

const movieList = require('../data/films.json');
const metaData = require('../data/filmsMetaData.json');

export const MovieSelector = () => {
    return (
        <div>
            <Container>
                <Jumbotron>
                    <h1 className="display-3">Testomg!</h1>
                    <p className="lead">This is just a test.</p>
                    <hr className="my-2" />
                    <p>Content goes here.</p>
                    <p className="lead">
                        <Button color="primary">I accept my fate</Button>
                    </p>
                    {/*<pre>*/}
                    {/*    {JSON.stringify(movieList)}*/}
                    {/*</pre>*/}

                </Jumbotron>
            </Container>
        </div>);
}