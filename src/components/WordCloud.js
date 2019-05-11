import React, { Component } from 'react';
import ReactWordCloud from 'react-wordcloud';
import axios from 'axios';

export default class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCloud: [],
    };
  }
  componentDidMount() {
    if (this.props.docID) {
      axios
        .get(`http://localhost:5000/wordCloud/${this.props.docID}`)
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
    let sid = this.props.sid || 0;
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
