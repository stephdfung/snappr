import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer'

class Landing extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    document.body.style.backgroundColor = '#FCA311'
    document.body.className="body-component-a"
  }

  render() {
    return(
      <div className="landing-page">
          <div className="hero">
            <div className="title">
              <hr className="left" />
                <h1>Hey, Snappr</h1>
              <hr className="right" />
            </div>
            <div className="p-container">
              <p>Snappr is a web application for you to take and share fun photos of yourself right</p>
              <p>from your computer. It was built with React, Ruby on Rails, and a lil' bit of ♥.</p>
              <p>Want in? Get started below!</p>
           </div>
          <div className="hero-buttons">
            <button>Snap a pic</button>
            <button>View the gallery</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Landing;