import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer'

class Create extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("Loaded component")
  }

  render() {
    return(
      <div className="create-new">
        <video id="video" width="640" height="480" autoplay></video>
        <button id="snap">snap</button>
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
    )
  }

}