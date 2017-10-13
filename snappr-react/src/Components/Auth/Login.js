import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cookies from 'cookies-js';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      fireRedirect: false,
      user: {}
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    console.log('INSIDE LOGIN.JS')
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(event) {
      event.preventDefault();

      let data = {
        email: this.state.email,
        password: this.state.password
      }

      axios({
        method: 'POST',
        url: 'http://localhost:3001/auth/sign_in',
        data: data
      })
      .then(res => {
        // res has headers with
        // access-token
        // token-type
        // client
        // uid

        // you need to store those somewhere (state)
        // and then send them with all following requests (in the headers)
        // https://github.com/axios/axios#global-axios-defaults

        //SETTING cookies here to grab the access tokens
        //these cookies exist within the application and can be used anywhere
        cookies.set('access-token', res.headers["access-token"]);
        cookies.set('client', res.headers["client"]);
        cookies.set('token-type', res.headers["token-type"]);
        cookies.set('uid', res.headers["uid"]);
        cookies.set('expiry', res.headers["expiry"]);


        this.props.currentUser(res.data);

        console.log('these are your headers: ', res.headers)

        this.props.updateHeader(res.headers)

        if(res.data){
          this.setState({
            user: res,
            fireRedirect: true
          })
        } else{
        alert('Inccorect username or password!')
        event.target.reset();
        }
        
      }).catch(err => console.log(err));
        
  } 
    
  render() {
    return(
      <div className="login-register">

        <div className="top">
          <h3>Login</h3>
        </div>

        <div className="form">
          <form onSubmit={(event)=> {this.handleFormSubmit(event)}}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="8" required 
              value={this.state.password}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input className="submit"
              type="submit"
              value="Log In"
            />
          </form>
          {this.state.fireRedirect
          ? <Redirect push to={`/gallery/`} />
          : ''}
        </div>
        <p><Link to={`/auth/register`}>Don't have an account? Register here!</Link></p>
      </div>
    )
  }
}

export default Login;