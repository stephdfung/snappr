import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

//importing my componenets here
import Nav1 from './Components/Nav1';
import Nav2 from './Components/Nav2';

import Create from './Components/Create';
import Landing from './Components/Landing';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Landing} />
          
          <Route path="/snap" component={Create} />
        </div>
      </Router>
    );
  }
}

export default App;
