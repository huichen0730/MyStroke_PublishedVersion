import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading,Constants } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Icon} from '@expo/vector-icons';
import AuthNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import PatientMainNavigator from './navigation/PatientMainNavigator';

//for firebase config
import  ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,

      userToken: undefined,
    };
    
    //declaring a loadPatientCode method
    this.loadPatientCode()

    //initialise firebase
    //including if statement to check if it has already been initialised;
    //Sometimes initialise it muliple times will crash the program
    //so it is always safer to include if statement
    if (!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
      //for firebase autentication method to detect/listen to if the state has changed
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }
  }

  //defining the loadPatientCode method
  loadPatientCode = async() => {
    const userToken = await AsyncStorage.getItem('userToken')
    //userToken refers to patient code
    this.setState({userToken: userToken});
  }

  //this method update the auth states/variables to make sure direct to correct page based on if user logged in
  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }

  render() {
    if ( (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 
    //this use firebase auth method, if the value changed, go to physio homepage
    else if (this.state.isAuthenticated) 
    {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
  
          <MainTabNavigator/>

        </View>
      );
    }
    //this use asyncstorage method, if the value changed, go to patient homepage
    else if (this.state.userToken)
    {
      return (
        <View style={styles.container}>

          <PatientMainNavigator/>

        </View>
      );
    }
    //if neither patient nor physio logged in, then go to auth pages (login pages)
    else
    {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          
          <AuthNavigator/>

        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/Logo.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop:Constants.statusBarHeight,
  },
  statusBarUnderlay: {
    height:10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
