import React, { Component } from 'react';
import profilePicture from '../profile.jpeg'
export class Profile extends Component {
  render() {
    return (
      <div id="profile" class="container">
        <h1>Profile</h1>
        <div class="row" style={rowPadding_s}>
          <div class="col-md-6">
            <h2>About Me</h2>
            <p style={aboutMeDesc_s}>
              I am an allround web developer. 
              I am a senior programmer with good knowledge of front-end techniques. 
              I love structure and order and I also stand for quality. 
              I love spending time on fixing little details and optimizing web apps. 
              Also I like working in a team, you'll learn faster and much more. As the saying goes: 
              'two heads are better than one'. 
            </p>
          </div>
          <div class="col-md-6">
            <img src={profilePicture} alt="profile" style={profilePicture_s}/>
          </div>
        </div>
      </div>
    );
  }
}

const profilePicture_s = {
  borderRadius:'50%',
  maxHeight:'200px',
  borderWidth:'4px',
  borderColor:'000',
  borderStyle:'solid'
};
const aboutMeDesc_s = {
  fontAlign:'left'
};
const rowPadding_s = {
  paddingTop:'100px',
  paddingBottom:'100px'
}