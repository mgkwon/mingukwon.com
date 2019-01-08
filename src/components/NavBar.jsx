import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
// import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"><Link smooth class="nav-link" to="#profile">Profile</Link></li>
            <li class="nav-item"><Link smooth class="nav-link" to="#experiences">Experiences</Link></li>
            <li class="nav-item"><Link smooth class="nav-link" to="#projects">Projects</Link></li>
            <li class="nav-item"><Link smooth class="nav-link" to="#contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}