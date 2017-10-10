import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer'

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        Hello World this is the landing page
      </div>
    )
  }
}


export default Landing;