import React, {Component} from 'react';
import { Link , Redirect} from 'react-router-dom';
import axios from 'axios';

class Nav2 extends Component {
  
  constructor(){
    super();
    this.state = {
      user: {},
      dataLoaded: false,
    }
    this.renderAccountLink = this.renderAccountLink.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  logOut() {
      axios({
        method: 'GET',
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
        user: this.props.user,
        dataLoaded: true
      })
  }

  logOut() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/auth/logout'
    })
    .then ((res)=>{
      if (res.data.loggedOut) {
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
          {this.state.dataLoaded ? this.renderAccountLink() : " " }
          <Link to={"/gallery"} className="nav-button">Gallery</Link>
          <Link onClick={this.logOut} to={"/"} className="nav-button">Log Out</Link>
        </div>


      </div>
    )
  }
}

export default Nav2;