import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PatientMainNavigator from './PatientMainNavigator';

import PatientLoginScreen from '../screens/Authentication/PatientLoginScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import SignupScreen from '../screens/Authentication/SignupScreen';

const AuthNavigator = createAppContainer(createStackNavigator(
  {
    PatientLogin: PatientLoginScreen,
    Login: LoginScreen,
    ForgotPassword:ForgotPasswordScreen,
    SignUp:SignupScreen,
  },
  { 
    navigationOptions: () => ({
      title:'MyStroke'
    }),
  }
));


export default createAppContainer(createSwitchNavigator({
  //Switch between these three
  Auth: AuthNavigator,
  Patient:PatientMainNavigator,
  Main: MainTabNavigator,
}));

//export default AuthNavigator;

