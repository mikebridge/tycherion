import React from 'react';
// import logo from './logo.svg';
// import './app.css';
import {NavBar} from "./main/navBar";
import {MovieSelector} from "./main/movieSelector";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
    <>
      <NavBar/>
      <MovieSelector/>
    </>
);


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
//   );
// }

export default App;
