import React, {Component} from 'react';
import { Link , Redirect} from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';

class Nav2 extends Component {
  
  constructor(){
    super();
    this.state = {
      dataLoaded: false,
    }
    this.renderAccountLink = this.renderAccountLink.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  logOut() {
      axios({
        method: 'DELETE',
        url: 'http://localhost:3001/auth/logout'
      })
      .then ((res)=>{
        if (res.data.loggedOut) {
          this.props.loggedOut();
          <Redirect push to={'/'} />
        }
      })
    }
  

  componentDidMount(){
      this.setState({
        dataLoaded: true
      })
  }

  logOut() {

    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };

    axios({
      method: 'DELETE',
      url: 'http://localhost:3001/auth/sign_out',
      headers: headers
    })
    .then ((res)=>{
      if (res.data.success) {
        this.props.loggedOut();
        <Redirect push to={'/'} />
      }
    })
  }

  renderAccountLink(){
    return(
      <Link to={`/profile/${this.props.user.id}`} className="nav-button">Account </Link> 
    )
  }

  render(){
    return (
      <div className="nav">

        <div className="lock-up">
          <Link to={`/`}> <h5>snappr</h5> </Link>
        </div>

        <div className="nav-buttons-align">
          {/* {this.state.dataLoaded ? this.renderAccountLink() : " " } */}
          <Link to={"/snap"} className="nav-button">Snap</Link>
          <Link to={"/gallery"} className="nav-button">Gallery</Link>
          <Link onClick={this.logOut} to={"/"} className="nav-button">Log Out</Link>
        </div>


      </div>
    )
  }
}

export default Nav2;