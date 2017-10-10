import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer'

class Create extends Component {
  constructor() {
    super();
    
    this.state = {
      constraints: {
        audio: false,
        video: { width: 640, height: 480 }
      }
    };

    this.snapPicture =  this.snapPicture.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.clearPicture = this.clearPicture.bind(this);
  }

  componentDidMount() {
    console.log("Loaded component")

    const constraints = this.state.constraints;
    const getUserMedia = (params) => (
      new Promise((successCallback, errorCallback) => {
        navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback);
      })
    );

    getUserMedia(constraints)
      .then((stream) => {
        const video = document.querySelector('video');
        const vendorURL = window.url || window.webkitURL;

        video.src = vendorURL.createObjectURL(stream);
        video.play();
      })
      .catch((err) => {
        console.log(err);
      })
      
    this.clearPicture();

    // let video = this.refs.video;

    // if (navigator.mediaDevies && navigator.mediaDevies.getUserMedia) {
    //   console.log('true')
    //   navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
    //   video.src = window.URL.createObjectURL(stream);
    //   video.play();
    //   })
    // }
  }

  clearPicture() {
    const canvas = document.querySelector('canvas');  
    const photo = document.getElementById('photo');  
    const context = canvas.getContext('2d');  
    const { width, height } = this.state.constraints.video;  
    context.fillStyle = '#FFF';  
    context.fillRect(0, 0, width, height);
    
    const data = canvas.toDataURL('image/png');  
    photo.setAttribute('src', data);  
  }

  handleStartClick(event) {
    event.preventDefault();
    this.snapPicture();
  }

  snapPicture() {
    // let context = canvas.getContext('2d');
    // let canvas = this.refs.canvas;

    // context.drawImage(video,0,0,640,480);

    const canvas = document.querySelector('canvas');  
    const context = canvas.getContext('2d');  
    const video = document.querySelector('video');  
    const photo = document.getElementById('photo');  
    const { width, height } = this.state.constraints.video;
    
    canvas.width = width;  
    canvas.height = height;  
    context.drawImage(video, 0, 0, width, height);
    
    const data = canvas.toDataURL('image/png');  
    photo.setAttribute('src', data); 
  }


  render() {
    return(
      // <div className="create-new">
      //   <video id="video" ref="video" width="640" height="480" autoPlay></video>
      //   <button id="snap" ref="snap" onClick={this.snapPicture}>snap</button>
      //   <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
      // </div>
      <div className="capture">

        <div className="camera">
          <video id="video"></video>
          <a id="startButton" onClick={ this.handleStartClick }>Take photo</a>
        </div>

        <canvas id="canvas" hidden></canvas>

        <div className="output">
          <img id="photo" alt="Your photo"/>
          <a id="saveButton"onClick={ this.handleSaveClick }>Save Photo</a>
        </div>

      </div>
    )
  }

}

export default Create;