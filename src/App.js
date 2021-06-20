import React, { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOperations } from './redux/authorization';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Container from './components/Container';
import AppBar from './components/AppBar';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);

const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<p>Loading in progress...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>

          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsPage />
          </PrivateRoute>

          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterPage />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginPage />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  );
}