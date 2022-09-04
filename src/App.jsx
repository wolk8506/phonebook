import { Routes, Route } from 'react-router-dom';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import ContactView from 'views/ContactView';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';

import RegisterView from 'views/RegisterView';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import operations from './redux/auth/auth-operations';
import authSelectors from './redux/auth/auth-selectors';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
    }
    dispatch(operations.fetchCurrentUser());
  }, [dispatch, isLoggedIn]);

  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomeView />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactView />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegisterView />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginView />
              </PublicRoute>
            }
          />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    )
  );
}
