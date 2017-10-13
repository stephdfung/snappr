import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importing my componenets here
import Nav1 from './Components/Nav1';
import Nav2 from './Components/Nav2';
import Footer from './Components/Footer';

import Create from './Components/Create';
import Landing from './Components/Landing';
import Gallery from './Components/Gallery';
import ShowDestroy from './Components/ShowDestroy';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false,
    }

    this.currentUser = this.currentUser.bind(this)
    this.Nav = this.Nav.bind(this)
    this.loggedOut = this.loggedOut.bind(this)
  }

  Nav({children}) {
    return (
      <div>
        {this.state.loggedIn ? <Nav2 user={this.state.user} loggedOut={this.loggedOut} /> : <Nav1 user={this.state.user}/>} {children}
      </div>
    )
  }


  currentUser(res) {
    this.setState({
      user: res.data,
      loggedIn: true
    })
    console.log('currentUser function is being called and this is the new data--- >', this.state)
  }

  loggedOut(){
    this.setState({
      user: {},
      loggedIn: false,
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={this.Nav} />

          <Route exact path="/" component={Landing} />
          <Route exact path="/snap" render={(props) => <Create {...props} user={this.state.user} /> } />
          <Route exact path="/snap/:id" render={(props) => <ShowDestroy {...props} user={this.state.user} /> } />
          <Route exact path="/gallery" component={Gallery} />

          <Route exact path="/auth/login" render={(props) => <Login {...props} currentUser={this.currentUser} /> } />
          <Route exact path="/auth/register" render={(props) => <Register {...props} currentUser={this.currentUser} /> } />
        
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
