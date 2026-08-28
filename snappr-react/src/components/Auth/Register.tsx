import { Component, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import cookies from 'cookies-js';
import { User } from '../../types/models';

interface RegisterProps extends RouteComponentProps {
  currentUser: (res: { data: User }) => void;
}

interface RegisterState {
  name: string;
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
  fireRedirect: boolean;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
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
    document.body.style.backgroundColor = '#FCA311'
    document.body.className="body-component-a"
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    let name = event.target.name;
    let value = event.target.value;

    console.log(event.target.name)
    console.log(event.target.value)

    this.setState({
      [name]: value,
    } as Pick<RegisterState, 'name' | 'nickname' | 'email' | 'password' | 'password_confirm'>);
  }

  handleFormSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      console.log('inside handleformsubmit')

    if (this.state.password === this.state.password_confirm) {

      let data = {
        name: this.state.name,
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password
      }

      axios({
        method: 'POST',
        url: 'http://localhost:3001/auth/',
        data: data
      })
      .then(res => {

        //SETTING cookies here to grab the access tokens
        //these cookies exist within the application and can be used anywhere
        cookies.set('access-token', res.headers["access-token"]);
        cookies.set('client', res.headers["client"]);
        cookies.set('token-type', res.headers["token-type"]);
        cookies.set('uid', res.headers["uid"]);
        cookies.set('expiry', res.headers["expiry"]);


        console.log('response data from ',res.data);

        this.props.currentUser(res)
        this.setState({
          fireRedirect: true,
        });
      }).catch(err=> console.log(err));
      (event.target as HTMLFormElement).reset();

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

        <div className="title">
          <hr className="left" />
            <h2>Register</h2>
          <hr className="right" />
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
              minLength={8} required 
              value={this.state.password}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="password_confirm"
              minLength={8} required 
              value={this.state.password_confirm}
              onChange={(event)=> {this.handleInputChange(event)}}
            />
            <input
              className="submit"
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
