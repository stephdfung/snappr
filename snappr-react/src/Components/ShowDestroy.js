import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ShowDestroy extends Component {
  constructor() {
    super();
    this.state={
      pic: '',
      fireRedirect: false,
    };
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
        console.log('THIS IS THE RESPONSE DATA ',res.data)
        console.log('this is the state in axios', this.state.pic)
    }).catch(err => console.log(err));
  }

  destroyPic() {
    const id = this.props.match.params.id

    axios({
      method: 'DELETE',
      url: `http://localhost:3001/pics/${id}`,
      data: {id}
    }).then(() => {
      fireRedirect: true
    }).catch( err => {console.log(err)
    });
  }



  render() {
    return (
      <div className="pic-show">
        <img src={this.state.pic.canvas_img} alt='' />

      </div>
    )
  }

}

export default ShowDestroy;