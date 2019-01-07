import React, { Component } from 'react';
import Typing from 'react-typing-animation';

export class Front extends Component {
  render() {
    return (
      <div class="container" style={containerHeight_s}>
        {/* <div class="row">
					<div class="col-sm-12" > */}
						<div style={verticalCenter_s}>
						<div class="row">
							<Typing>
								<span style={name_s}>MINGU KWON</span>
							</Typing>
						</div>
						<div class="row">
							<Typing>
								<Typing.Delay ms={1000}/>
								<span stlye={title_s}>Robotics Software Engineer</span>
							</Typing>
						</div>
						</div>
					{/* </div>
        </div> */}
      </div>
    );
  }
}


// styles
const containerHeight_s = {
	height:'100vh'
};
const verticalCenter_s = {
	align:'left',
	position:'absolute',
	top:'40%'
};
const name_s = {
	fontSize:'40px'
};
const title_s = {
	fontSize:'10px'
};