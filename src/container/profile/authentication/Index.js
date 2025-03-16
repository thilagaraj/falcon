import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Row align={'middle'} justify={'center'} style={{ minHeight: '100vh' }}>
        <Col >
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
