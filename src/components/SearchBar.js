import React, { useState } from 'react';
import { Icon, Button, AutoComplete } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import axios from 'axios';

const SearchBar = ({ dispatch, searches }) => {
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleChange = query => {
    setSearchQuery(query);
  };
  const handleSearchClick = () => {
    router.push(`/search?q=${searchQuery}`);
  };

  const handleSearch = query => {
    if (!fetching && query) {
      setFetching(true);
      axios
        .get(`http://34.85.64.219:5000/suggest/${query}`)
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
  return (
    <div className="global-search-wrapper">
      <AutoComplete
        className="global-search"
        size="large"
        style={{ width: '50%' }}
        dataSource={dataSource}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder="Search Keywords"
      />
      <Button className="search-btn" size="large" type="normal" onClick={handleSearchClick}>
        <Icon type="search" />
      </Button>
    </div>
  );
};

export default connect(({ searches, selectVideo }) => ({
  searches,
  selectVideo,
}))(SearchBar);
