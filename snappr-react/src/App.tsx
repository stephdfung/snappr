import { Component, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importing my componenets here
import Nav1 from './components/Nav1';
import Nav2 from './components/Nav2';
import Footer from './components/Footer';

import Create from './components/Create';
import Landing from './components/Landing';
import Gallery from './components/Gallery';
import ShowDestroy from './components/ShowDestroy';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import { User } from './types/models';

interface AppState {
  user: User;
  loggedIn: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false,
    }

    this.currentUser = this.currentUser.bind(this)
    this.Nav = this.Nav.bind(this)
    this.loggedOut = this.loggedOut.bind(this)
  }

  Nav({children}: {children?: ReactNode}) {
    return (
      <div>
        {this.state.loggedIn ? <Nav2 user={this.state.user} loggedOut={this.loggedOut} /> : <Nav1 />} {children}
      </div>
    )
  }


  currentUser(res: { data: User }) {
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
