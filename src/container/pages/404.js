import React from 'react';
import { NavLink } from 'react-router-dom';
import { ErrorWrapper } from './style';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';

function NotFound() {
  return (
    <Main>
      <ErrorWrapper>
        <img src={require(`../../static/img/pages/404.svg`).default} alt="404" />
        <Heading className="error-text" as="h3">
          404
        </Heading>
        <p>Sorry! the page you are looking for does n`t exist.</p>
        <NavLink to="/admin">
          <Button size="default" type="primary" to="/admin">
            Return Home
          </Button>
        </NavLink>
      </ErrorWrapper>
    </Main>
  );
}

export default NotFound;
