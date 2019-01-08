import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { NavBar } from "./components/NavBar";
import { Front } from "./components/Front";
import { Profile } from "./components/Profile";
import { Experiences } from './components/Experiences';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar></NavBar>
          <Front></Front>
          <Profile></Profile>
          <Experiences></Experiences>
          <Projects></Projects>
          <Contact></Contact>
      </div>
    );
  }
}

export default App;