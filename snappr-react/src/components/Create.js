import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

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

  handleSaveClick() {
    const canvas = document.querySelector('canvas');
    
    let data = {
      canvas_img: canvas.toDataURL('image/png')
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3001/pics',
      data
    }).then( res => {
      console.log(res.data);
    }).catch( err => console.log(err))
  }


  render() {
    return(

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