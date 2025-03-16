import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

import { login } from '../../../../redux/authentication/actionCreator';

const SignUp = () => {
  const { isSignUpError, isSignUpLoading, isFbAuthenticate } = useSelector(state => {
    return {
      isSignUpError: state.firebaseAuth.isSignUpError,
      isSignUpLoading: state.firebaseAuth.isSignUpLoading,
      isFbAuthenticate: '324234234342',
    };
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    values: null,
    checked: null,
  });

  const handleFbLogin = useCallback(() => {
    dispatch(login());
    history.push('/admin');
  }, [dispatch, history]);

  useEffect(() => {
    if (isFbAuthenticate) {
      handleFbLogin();
    }
  }, [isFbAuthenticate, handleFbLogin]);

  const handleSubmit = values => {
   // dispatch(fbAuthSignUp({ ...values, terms: state.checked }));
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/fbSignIn">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up With Firebase to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>
              Creating an account means you’re okay with our Terms of Service and Privacy Policy
            </Checkbox>
          </div>
          {isSignUpError ? <p>{isSignUpError.message}</p> : null}
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              {isSignUpLoading ? 'Loading...' : 'Create Account'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login signin-social">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </Link>
            </li>
            <li>
              <Link  className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
