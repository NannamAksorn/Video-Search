import React, { Component } from 'react';
import ReactWordCloud from 'react-wordcloud';
import axios from 'axios';
import { connect } from 'dva';

class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCloud: [],
    };
  }
  componentDidMount() {
    if (this.props.docID) {
      axios
        .get(`${process.env.API_URL}/wordCloud/${this.props.docID}`)
        .then(res => {
          let wordCloud = Object.keys(res.data).map(id => {
            return Object.keys(res.data[id]).map(word => {
              return { text: word, value: res.data[id][word] };
            });
          });
          this.setState({ wordCloud: wordCloud });
        })
        .catch(e => {
          console.log('error', e);
        });
    }
  }

  render() {
    let sid = this.props.subtitle || this.state.wordCloud.length - 1;
    return (
      <div>
        <ReactWordCloud
          words={this.state.wordCloud[sid] || []}
          wordCountKey={'value'}
          wordKey={'text'}
          options={{
            rotations: 0,
            scale: 'sqrt',
            fontFamily: 'impact',
            fontSizes: [10, 60],
            spiral: 'archimedean',
          }}
          //   minSize={[400, 400]}
          //   size={[100, 100]}
        />
      </div>
    );
  }
}

export default connect(({ subtitle }) => ({
  subtitle,
}))(WordCloud);
