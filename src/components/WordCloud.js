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
          callbacks={{
            getWordTooltip: ({ text, value }) => {
              // axios
              //   .get(
              //     `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${text}&limit=1&namespace=0&format=json`,
              //   )
              //   .then(res => {
              //     //0: "ideas"
              //     // 1: ["Idea"]
              //     // 2: ["In philosophy, ideas are usually taken as mental r…ct concepts that do not present as mental images."]
              //     // 3: ["https://en.wikipedia.org/wiki/Idea"]
              //     // console.log(res.data[2][0]);
              //   });
              return text;
            },
            onWordClick: ({ text }) => {
              axios
                .get(
                  `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${text}&limit=1&namespace=0&format=json`,
                )
                .then(res => {
                  if (res.data[3].length > 0) {
                    window.open(res.data[3][0]);
                  }
                  // console.log(res.data[2][0]);
                });
            },
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
