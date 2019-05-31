import React, { useState } from 'react';
import videoConnect from 'react-html5video';
import _ from 'lodash';
import { Button, AutoComplete, Menu, Dropdown } from 'antd';
import axios from 'axios';
import { connect } from 'dva';

const target = 0;
const Video = ({ video, dispatch, docID, docName, category, videoEl, children, ...restProps }) => {
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchresult, setSearchResult] = useState([
    { text: 'Click Scene Search Button to get the Results', start: 0 },
  ]);
  const [fetching, setFetching] = useState(false);

  const handleChange = query => {
    setSearchQuery(query);
    setSearchResult([{ text: 'Click Scene Search Button to get the Results', start: 0 }]);
  };
  const handleSearchClick = () => {
    if (searchQuery) {
      axios
        .get(`http://34.85.64.219:5000/sub/${category}/${docName}/${docID}/${searchQuery}`)
        .then(res => {
          setSearchResult(res.data);
        })
        .catch(e => {
          console.log('error', e);
        });
    }
  };

  const jump = e => {
    console.log(e);
    videoEl.currentTime = e;
  };

  const handleSearch = query => {
    if (!fetching && query) {
      setFetching(true);
      axios
        .get(`http://34.85.64.219:5000/suggestSub/${docID}/${query}`)
        .then(res => {
          // console.log(res.data);
          setDataSource(res.data);
          setFetching(false);
        })
        .catch(e => {
          setFetching(false);
          console.log('error', e);
        });
    }
  };
  let subIndex = null;
  if (
    video &&
    video.textTracks &&
    video.textTracks.length > 0 &&
    video.textTracks[target].activeCues &&
    video.textTracks[target].activeCues.length > 0
  ) {
    subIndex = _.findIndex(
      video.textTracks[target].cues,
      x => x.text === video.textTracks[target].activeCues[target].text,
    );
    dispatch({
      type: 'subtitle/set',
      payload: subIndex,
    });
  }
  const menu = (
    <Menu>
      {searchresult.map((item, i) => (
        <Menu.Item key={i} onClick={() => jump(item.start)}>
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div className="global-search-wrapper">
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '200 px' }}
          dataSource={dataSource}
          onSearch={handleSearch}
          onChange={handleChange}
          placeholder="Search Keywords"
        />
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button size="large" onClick={handleSearchClick}>
            Scene Search
          </Button>
        </Dropdown>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <video {...restProps}>{children}</video>
      </div>
    </div>
  );
};

export default videoConnect(
  connect(({ subtitle }) => ({
    subtitle,
  }))(Video),
);
