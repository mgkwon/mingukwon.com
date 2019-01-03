import React, { Component } from 'react';

export class Profile extends Component {
  render() {
    return (
      <div class="container">
        <h2>Profile</h2>
        <p>Robotist</p>
        <hr></hr>
        <div class="row">
          <div class="col-md-4">
            <h3>About Me</h3>
          </div>
          <div class="col-md-4">
            Picture
          </div>
          <div class="col-md-4">
            <h3>About Me</h3>
          </div>
        </div>
      </div>
    );
  }
}