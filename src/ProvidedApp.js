import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import Screens and Components
import LoginScreen from './screens/LoginScreen';
import BrowseScreen from './screens/BrowseScreen';

const ProvidedApp = () => {
  const loginState = useSelector(state => state.loginState);
  return (
    <>
      {!loginState.success && <LoginScreen />}
      {loginState.success && <BrowseScreen />}
    </>
  );
};

export default ProvidedApp;
