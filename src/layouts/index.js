import styles from './index.css';
import { Layout, Row, Col } from 'antd';
import logo from '../assets/logo.png';
import SearchBar from '../components/SearchBar';
import { connect } from 'dva';
import Link from 'umi/link';
const { Header, Content } = Layout;

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Layout>
        <Header className={styles.header}>
          <Row gutter={48}>
            <Col span={4}>
              <Link to="/">
                <img className="logo" src={logo} width="50px" alt="logo" />
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Lato',
                    margin: '5px',
                    fontWeight: '300',
                    display: 'absolute',
                    overflow: 'hidden',
                  }}
                >
                  Video Search
                </span>
              </Link>
            </Col>
            <Col span={16}>
              <SearchBar />
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </div>
  );
}

export default connect(({ selectVideo }) => ({
  selectVideo,
}))(BasicLayout);
