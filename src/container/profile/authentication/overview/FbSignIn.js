import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';

import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, isFbAuthenticate } = useSelector(state => {
    return {
      error: state.firebaseAuth.error,
      isLoading: state.firebaseAuth.loading,
      isFbAuthenticate: '23432324324',
    };
  });
  const [form] = Form.useForm();
  const [state, setState] = useState({
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
    //dispatch(fbAuthLogin(values));
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };
  console.log(isLoading);
  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/fbRegister">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in With Firebase to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="email"
            rules={[{ message: 'Please input your Email!', required: true }]}
            label="Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ message: 'Please input your password!', required: true }]}
            name="password"
            label="Password"
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          {error ? <p>{error.message}</p> : null}
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link  className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
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

export default SignIn;
