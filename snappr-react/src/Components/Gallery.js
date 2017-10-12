import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pics: null, 
      picsLoaded: false
    }
    this.showGallery = this.showGallery.bind(this);
    this.loadingMessage = this.loadingMessage.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/pics',
    }).then( res => {
      this.setState({
        pics: res.data,
        picsLoaded: true
      })
      console.log(res.data);
    }).catch( err => console.log(err))
  }

  showGallery(pic) {
    return(
      <div className="gallery-pic">
        <Link to={`/snap/${pic.id}`}> 
          <img src={pic.canvas_img} />
        </Link>
      </div>
    )
  }

  loadingMessage() {
    return(
      <div className="load-msg">
        Loading ya'll...
      </div>
    )
  }

  render() {
    return (
      <div className="gallery">
        {this.state.picsLoaded ? this.state.pics.map(this.showGallery) : this.loadingMessage}
      </div>
    )
  }

}



export default Gallery;