import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
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
      <Link to={`/watch?v=${props.video}&id=${props.vkey}&c=${props.category}`}>
        <Row>
          <Col span={12}>
            <img src={`tmp/${props.video}-thumbnail-320x240-0001.png`} alt="video" />
          </Col>
          <Col span={12}>
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
        </Row>
      </Link>
    </div>
  );
};

export default connect(({ selectVideo }) => ({
  selectVideo,
}))(VideoCard);
