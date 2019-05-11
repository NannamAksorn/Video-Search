import React from 'react';
import { Row } from 'antd';
import ReactPlayer from 'react-player';

const VideoPlayer = props => {
  return (
    <div
      style={{
        background: 'rgba(0,40,85,1)',
        border: '5px',
        margin: '50px',
        height: '650px',
        width: '720px',
        overflow: 'hidden',
      }}
    >
      <Row>
        <ReactPlayer
          url={`./video/${props.video}#t=${props.start}`}
          controls
          width="720px"
          height="480px"
          config={{
            file: {
              tracks: [
                {
                  kind: 'subtitles',
                  src: './srt/' + props.video.replace('mp4', 'vtt'),
                  srcLang: 'en',
                  default: true,
                },
              ],
            },
          }}
        />
      </Row>
      <Row style={{ overflow: 'hidden', whiteSpace: 'nowrap', margin: '5px' }} span={2}>
        <div style={{ background: '#096dd9', padding: '5px' }}>
          <font color="white">
            <b>{props.video}</b>
          </font>
        </div>
      </Row>
      <Row span={20}>
        <div style={{ background: '#e6f7ff', padding: '5px', textAlign: 'left' }}>
          <font color="black">{props.description}</font>
        </div>
      </Row>
    </div>
  );
};

export default VideoPlayer;
