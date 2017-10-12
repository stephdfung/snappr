import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nickname: '',
      email: '',
      password: '',
      password_confirm: '',
      fireRedirect: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

  }
  componentDidMount(){
    console.log(this.state)
  }

  handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    console.log(event.target.name)
    console.log(event.target.value)

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(event) {
      event.preventDefault();
      console.log('inside handleformsubmit')
    if (this.state.password === this.state.password_confirm) {
      // fetch POST request to server to create new user
      // redirect to their profile? back two pages?

      let data = {
        name: this.state.name,
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password
      }
//routes here are not valid revist
      axios({
        
        method: 'POST',
        url: 'http://localhost:3001/auth/',
        data: data
      })
      .then(res => {
        console.log('res.data---->',res.data);
        this.props.currentUser(res)
        this.setState({
          newID: res.data.id,
          //The res.data.id might be wrong here
          fireRedirect: true,
        });
      }).catch(err=> console.log(err));
      event.target.reset();

    } else {
      alert('Passwords do not match.. THIS IS THE ELSE STATEMENT')
      // we can update the alert later to be more complex
      this.setState({
        password: '',
        password_confirm: ''
      })
    }
  }
  

  render() {
    return(
      <div className="login-register">

        <div className="top">
          <h3>Register</h3>
        </div>

        <div className="form">
          <form onSubmit={(event)=> {this.handleFormSubmit(event)}}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              type="text"
              placeholder="Nickname"
              name="nickname"
              value={this.state.nickname}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              type="email"
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="password_confirm"
              minLength="8" required 
              value={this.state.password_confirm}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              type="submit"
              value="Register"
            />
          </form>
          {this.state.fireRedirect
          ? <Redirect push to={`/gallery`} />
          : ''}
        </div>
        <Link to={`/auth/login`}>Already registered? Log in here!</Link>
      </div>
    )
  }
}

export default Register;