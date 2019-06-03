import React, { Component } from 'react';
import queryString from 'query-string';
import Video from '../../components/Video';
import 'react-html5video/dist/styles.css';
import axios from 'axios';
import { Tabs } from 'antd';
import ReactWordCloud from 'react-wordcloud';
import WordCloud from '../../components/WordCloud';
const TabPane = Tabs.TabPane;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: {},
      words: [],
    };
  }
  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    axios
      .get(`${process.env.API_URL}/description/${params.id}`)
      .then(res => {
        this.setState({ description: res.data });
      })
      .catch(e => {
        console.log('error', e);
      });
    axios
      .get(`${process.env.API_URL}/wordCloud/${params.id}`)
      .then(res => {
        let wordCloud = Object.keys(res.data).map(id => {
          return Object.keys(res.data[id]).map(word => {
            return { text: word, value: res.data[id][word] };
          });
        });
        this.setState({ words: wordCloud[wordCloud.length - 1] });
      })
      .catch(e => {
        console.log('error', e);
      });
  }

  render() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(`video/${params.v}.mp4`);
    return (
      <div style={{ fontFamily: 'Georgia, sans-serif', align: 'center' }}>
        <br />
        <hr />
        <h1>
          <b>{params.v}</b>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Video
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            docID={params.id}
            category={params.c}
            docName={params.v}
          >
            <source src={`video/${params.v}.mp4`} type="video/webm" />
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src={`vtt/${params.v}.vtt`}
              default
            />
          </Video>
          <div>
            <h1>WordCloud</h1>
            <WordCloud docID={params.id} />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div
          style={{
            display: 'flex',
            verticalAlign: 'space-between',
            marginBottom: '150px',
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h1>Summery</h1>
            <Tabs
              defaultActiveKey="1"
              style={{ color: 'white', fontSize: 'medium', textAlign: 'left' }}
            >
              <TabPane tab="20%" key="1">
                {this.state.description.d20 || []}
              </TabPane>
              <TabPane tab="40%" key="2">
                {this.state.description.d40 || []}
              </TabPane>
              <TabPane tab="60%" key="3">
                {this.state.description.d60 || []}
              </TabPane>
              <TabPane tab="80%" key="4">
                {this.state.description.d80 || []}
              </TabPane>
            </Tabs>
            <br />
          </div>
          <div style={{ width: '600px', height: '600px' }}>
            <h1>Word Cloud</h1>
            <ReactWordCloud
              words={this.state.words || []}
              wordCountKey={'value'}
              wordKey={'text'}
              options={{
                rotations: 0,
                scale: 'sqrt',
                fontFamily: 'impact',
                fontSizes: [13, 120],
                spiral: 'archimedean',
              }}
            />
          </div>
        </div>
        <hr />
        <br />
      </div>
    );
  }
}
