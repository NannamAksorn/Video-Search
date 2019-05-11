import React from 'react';
import { connect } from 'dva';
// import styles from './VideoCard.css'
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import Link from 'umi/link';
const VideoCard = props => {
  return (
    <div
      style={{
        background: '#202020',
        border: '5px',
        margin: '5px',
        height: '150px',
        width: '700px',
        overflow: 'hidden',
      }}
    >
      <Row>
        <Col span={9}>
          {/* <VideoThumbnail
              videoUrl={`./video/${this.props.video}`}
              style={{width:'100px'}}
            /> */}
          <ReactPlayer
            url={`./video/${props.video}.mp4#t=${props.start}`}
            controls
            width="250px"
            height="150px"
          />
        </Col>
        <Link to={`/watch?v=${props.video}&id=${props.vkey}&c=${props.category}`}>
          <Col span={15}>
            <Row style={{ overflow: 'hidden', whiteSpace: 'nowrap', margin: '5px' }} span={2}>
              <div style={{ padding: '5px', textAlign: 'left' }}>
                <font color="white">
                  <b>{props.video}</b>
                </font>
              </div>
            </Row>
            <Row span={20}>
              <div style={{ padding: '5px', textAlign: 'left' }}>
                <font color="#bfbfbf">{props.description}</font>
              </div>
            </Row>
          </Col>
        </Link>
      </Row>
    </div>
  );
};

export default connect(({ selectVideo }) => ({
  selectVideo,
}))(VideoCard);
