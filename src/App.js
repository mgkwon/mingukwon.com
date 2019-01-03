import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import {NavBar} from "./components/NavBar";
import {Profile} from "./components/Profile";
import { Experiences } from './components/Experiences';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <NavBar></NavBar>
        <Profile></Profile>
        <Experiences></Experiences>
        <Projects></Projects>
        <Contact></Contact>
      </div>
    );
  }
}

export default App;
