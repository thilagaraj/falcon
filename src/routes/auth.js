import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const FbLogin = lazy(() => import('../container/profile/authentication/overview/FbSignIn'));
const FbSignUp = lazy(() => import('../container/profile/authentication/overview/FbSignup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));

function NotFound() {
  return <Redirect to="/" />;
}

function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={Login} />
        <Route exact path="/fbRegister" component={FbSignUp} />
        <Route exact path="/fbSignIn" component={FbLogin} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
}

export default AuthLayout(FrontendRoutes);
