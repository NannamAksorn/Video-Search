import styles from './index.css';
import { connect } from 'dva';

const VideoCards = props => {
  // console.log(props.selectVideo);

  return (
    <div className={styles.normal}>
      <hr />
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: 'right' }}>
        “The only true wisdom is in knowing you know nothing.” <br /> <br />
        -- Socrates --
      </h1>
      <br />
      <br />
      <br />

      <hr />
      <br />
      <br />
      <br />
    </div>
  );
};

export default connect(({ searches, selectVideo }) => ({
  searches,
  selectVideo,
}))(VideoCards);
