import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/hompage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sing-in-and-sign-up/sign-in-and-sing-up';

import { GlobalStyle } from './global.styles';

import { Route, Switch, Redirect } from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions';

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);


  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
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
