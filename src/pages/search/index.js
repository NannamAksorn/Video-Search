import styles from '../index.css';
import React, { Component } from 'react';
import VideoCard from '../../components/VideoCard';
import queryString from 'query-string';
import { connect } from 'dva';
import axios from 'axios';

class VideoCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: {},
    };
  }
  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ queryString: params.q }, function() {
      axios
        .get(`${process.env.API_URL}/search/${this.state.queryString}`)
        .then(res => {
          this.setState({ videos: res.data });
        })
        .catch(e => {
          console.log('error', e);
        });
    });
  }

  componentDidUpdate(prevProps) {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ queryString: params.q }, function() {
        axios
          .get(`${process.env.API_URL}/search/${this.state.queryString}`)
          .then(res => {
            this.setState({
              videos: res.data,
            });
          })
          .catch(e => {
            console.log('error', e);
          });
      });
    }
  }

  render() {
    // console.log(this.state.videos);
    let videos = this.state.videos;
    return (
      <div className={styles.normal}>
        {Object.keys(videos).map((category, key) => (
          <div key={key}>
            <hr /> <br /> <br />
            <h1>
              <b>{category}</b>
            </h1>
            <br />
            {Object.keys(videos[category]).map((video, vkey) => (
              <div key={vkey}>
                <VideoCard
                  video={video}
                  description={videos[category][video].d}
                  vkey={videos[category][video].id}
                  category={category}
                />
              </div>
            ))}
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(({ searches, selectVideo }) => ({
  searches,
  selectVideo,
}))(VideoCards);
