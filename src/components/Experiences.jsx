import React, { Component } from 'react';

export class Experiences extends Component {
  render() {
    return (
      <div id="experience" class="container">
        <div class="row">
          <h1>Experiences</h1>
        </div>

        <div class="row">
          <h2>Careers</h2>
        </div>
        <div class="row" style={leftItem_s}>
          <div class="col-sm-4">
            <div style={company_s}>Dorabot Inc.</div>
            <div style={period_s}>May 2016 - June 2018</div>
          </div>
          <div class="col-sm-8">
            <div style={position_s}>Robotics Software Engineer</div>
            <div style={desc_s}>
              <ul>
                <li>Implemented random-sampling and search-based path planning algorithms.</li>
                <li>Developed and maintained entire manipulation pipeline from planning to control.</li>
                <li>Worked on object detection and segmentation software utilizing OpenCV and PCL.</li>
                <li>Programmed embedded software to control grippers and read sensor data from microcontrollers through
                    TCP/IP, Serial or CAN communication.</li>
                <li>Performed system integration and conducted demos to customers.</li>
                <li>Had experience with industrial robot arms from different venders such as Universal Robot, Yaskawa, Fanuc.</li>
              </ul> 
            </div>
          </div>
        </div>

        <div class="row" style={leftItem_s}>
          <div class="col-sm-4">
            <div style={company_s}>YunLab</div>
            <div style={period_s}>May 2015 - Apr 2016</div>
          </div>
          <div class="col-sm-8">
            <div style={position_s}>Software Architect</div>
            <div style={desc_s}>
              <ul>
                <li>Developed a machine shop monitoring system that is currently used by University of Waterloo.</li>
                <li>Implemented filters to eliminate noise in raw data acquired from sensors and data clustering algorithms.</li>
                <li>Built a wireless mesh network using ZigBee protocol to distribute data and relay messages.</li>
                <li>Utilized MQTT for device-to-server and WebSocket for browser-to-server communication.</li>
                <li>Designed and implemented a database architecture and querying algorithms in MongoDB.</li>
                <li>Developed a full-stack web app in with Node.js, AngularJS and d3.js for visualization of data in real-time</li>
              </ul> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// class ExperienceItem extends Component {
//   render() {
//     return (
//       <div style={experienceItem_s}>
      
//       </div>
//     );
//   }
// }

// styles
const leftItem_s = {
  textAlign:'left',
  paddingTop:'50px',
  paddingBottom:'50px'
};
const company_s = {
  fontWeight: 'bold',
  fontSize:'20px',
  marginTop:'10px',
  marginBottom:'10px'
};
const period_s = {
  fontSize:'15px'
};
const position_s = {
  fontSize:'20px',
  marginTop:'10px',
  marginBottom:'10px'
};
const desc_s = {
  fontSize:'15px'
};
