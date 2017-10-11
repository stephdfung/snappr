import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

//importing my componenets here
import Nav1 from './Components/Nav1';
import Nav2 from './Components/Nav2';
import Footer from './Components/Footer';

import Create from './Components/Create';
import Landing from './Components/Landing';
import Gallery from './Components/Gallery';
import ShowDestroy from './Components/ShowDestroy';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false,
    }
  }

  Nav({children}) {
    return (
      <div>
        {/* {this.state.loggedIn?<Nav2 />:<Nav1 user={this.state.user} />} {children} */}
        <Nav1/>
      </div>
    )
  }



  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={this.Nav} />

          <Route exact path="/" component={Landing} />
          <Route exact path="/snap" component={Create} />
          <Route exact path="/snap/:id" render = {props => <ShowDestroy user={this.state.user} /> } />
          <Route exact path="/gallery" component={Gallery} />
        
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
