import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';
// import {Canvas, Circle, Image, Path, Text} from 'react-fabricjs';
import { SketchPad, TOOL_PENCIL } from 'react-sketchpad/lib';

class Create extends Component {
  constructor() {
    super();
    
    this.state = {
      pic_id: '',
      cameraDisplay: true,
      constraints: {
        audio: false,
        video: { width: 640, height: 480 }
      },

      fireRedirect: false,
    };

    this.snapPicture =  this.snapPicture.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.clearPicture = this.clearPicture.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.twoMethodsCall = this.twoMethodsCall.bind(this);
    this.showCanvas = this.showCanvas.bind(this);
    this.retakeClick = this.retakeClick.bind(this);
    this.showCamera = this.showCamera.bind(this);
  }

  componentWillMount () {
    const script = document.createElement("script");

    script.src = "/stickerbomb.min.js";
    script.async = true;

    document.body.appendChild(script);

    // this.hello()
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

      let canvas = document.querySelector('#root > div > div.capture > div.output.hidden')
      canvas.style.display = 'none'
      
    this.clearPicture();
    document.body.style.backgroundColor = '#F1F1F1'
    document.body.className="body-component-b"
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
    this.setState({
      cameraDisplay: false,
    })


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
    //this is where the photo is getting added to the img tag in the HMTL

    
  }

  handleSaveClick(event) {
    event.preventDefault();

    console.log('INSIDE HANDLE CLICKSAVE.. ', this)
    const canvas = document.querySelector('canvas');

    let data = {
      user_id: this.props.user.id,
      canvas_img: canvas.toDataURL('image/png')
    }

    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3001/pics',
      data,
      headers: headers
    }).then((res) => {
      console.log('RESPONSE DATA AFTER SAVING PIC ---> ', res.data);
      this.setState({
        pic_id: res.data.id
      })
    }).catch( err => console.log(err))

    this.setState({
      fireRedirect: true
    })
  }
  
  showCanvas() {
    let canvas = document.querySelector('#root > div > div.capture > div.output.hidden')
    canvas.style.display = 'inline'
  }

  hideCanvas() {
    let canvas = document.querySelector('#root > div > div.capture > div.output.hidden')
    canvas.style.display = 'none'
  }

  showCamera(event) {
    event.preventDefault();
    this.setState({

      cameraDisplay: true
    })
    console.log(this.state)
  }

  twoMethodsCall(event) {
    this.handleStartClick(event);
    this.showCanvas();
  }

  retakeClick(event) {
    event.preventDefault();
    this.hideCanvas();
    this.showCamera(event);

  }

  renderCamera() {
    return (
      <div>
        <center><a id="startButton" onClick={ this.twoMethodsCall }>SNAP</a></center>
        <div className="camera">
          <video id="video"></video>
        </div>
      </div>
    )
  }


  // hello() {
  //   stickerbomb({
  //     target: '#target',
  //     backdrops: [ 'images/laptop.jpg' ],
  //     stickers: {
  //         'Stickers': [
  //             {
  //                 name: 'Angular',
  //                 src: 'images/angular.png',
  //                 widthPercentage: 15
  //             },
   
  //             {
  //                 name: 'WordPress',
  //                 src: 'images/wordpress.png',
  //                 widthPercentage: 15
  //             }
  //         ],
  //         'Accessories': [
  //             {
  //                 name: 'Bag',
  //                 src: 'images/bag.png',
  //                 widthPercentage: 60
  //             },
   
  //             {
  //                 name: 'Tattoo',
  //                 src: 'images/tattoo.png',
  //                 widthPercentage: 30
  //             }
  //         ]
  //     }
  // });
  
  // }



  render() {
    return(

      <div className="capture">

        {this.state.cameraDisplay ? this.renderCamera() : " "}

        <canvas id="canvas" hidden></canvas>

        <div className="output hidden">
          <center><a id="saveButton"onClick={ this.handleSaveClick }>Save Photo</a></center>
          <div className="camera-pic">
            <img id="photo" alt="Your photo"/>
          </div>
          <center><a id="startButton" onClick={ this.retakeClick }> Retake </a> </center>
          {this.state.fireRedirect ? <Redirect push to={`/snap/${this.state.pic_id}`} /> : ''}
        </div>

      </div>
    )
  }

}

export default Create;