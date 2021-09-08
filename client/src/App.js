import React, { useEffect, lazy, Suspense } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import ErrorBoundary from './components/error-boundary/error-boundery';

import { GlobalStyle } from './global.styles';

import { Route, Switch, Redirect } from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/hompage'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));
const SignInAndSignUpPage = lazy(() => import('./pages/sing-in-and-sign-up/sign-in-and-sing-up'));

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);


  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
