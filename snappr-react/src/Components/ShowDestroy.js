import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cookies from 'cookies-js';
import axios from 'axios';

class ShowDestroy extends Component {
  constructor() {
    super();
    this.state={
      pic: '',
      fireRedirect: false,
    };
    this.destroyPic = this.destroyPic.bind(this)
  }

  componentDidMount() {
    console.log('component mounted')
    const id = this.props.match.params.id

    axios({
      method: 'GET',
      url: `http://localhost:3001/pics/${id}`,
      data: {id}
    }).then((res) => {
      this.setState({
        pic: res.data,
      })
    }).catch(err => console.log(err));
  }

  destroyPic() {
    const id = this.props.match.params.id

    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };

    axios({
      method: 'DELETE',
      url: `http://localhost:3001/pics/${id}`,
      data: {id},
      headers: headers
    }).then(() => {
      this.setState({
        fireRedirect: true
      });
    }).catch( err => {console.log(err)
    });
  }



  render() {
    return (
      <div className="pic-show">
        <img src={this.state.pic.canvas_img} alt='' />
        <button className="delete" onClick={this.destroyPic} >Delete</button>
              {this.state.fireRedirect
                ? <Redirect push to="/gallery" />
                : ''}
      </div>
    )
  }

}

export default ShowDestroy;