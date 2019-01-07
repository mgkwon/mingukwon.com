import React, { Component } from 'react';

export class Experiences extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <h2>Experiences</h2>
        </div>
        <div class="row" style={leftItem_s}>
          <div class="col-sm-4">
            <div style={company_s}>Dorabot Inc.</div>
            <div style={period_s}>blah blah</div>
          </div>
          <div class="col-sm-8">
            <div style={position_s}>Robotics Software Engineer</div>
            <div style={desc_s}>
              blah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// styles
const leftItem_s = {
  textAlign:'left',
  marginTop:'10px',
  marginBottom:'10px'
};
const company_s = {
  fontSize:'20px'
};
const period_s = {
  fontSize:'10px'
};
const position_s = {
  fontSize:'20px'
};
const desc_s = {
  fontSize:'10px'
};
