import React, { Component }  from 'react';
import {
  Image,ScrollView,StyleSheet, Switch,
  Text,View,AsyncStorage,
} from 'react-native';

import firebase from 'firebase';
import {Notifications } from 'expo';  //for sending notifications 
import * as Permissions from 'expo-permissions';

export default class MyReminderScreen extends React.Component {
  static navigationOptions = {
    title: 'Reminder',
    headerStyle:{
      backgroundColor: '#0B5BA3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold',
      fontSize: 24,
    },
  };

  constructor(props){
    super(props);
    this.state= {
      patientCode:'',
      pushToken:'',
      //localNotificationId:undefined,
      switchValue:false,  //for mark the value of switch toggle for whether switch on notifications or not
    

    };
     //declaring a loadPatientCode method
     this.loadPatientCode()
  }

     //first load in patient code from logging in record in asyncStorage 
     loadPatientCode = async() => {
      const userToken = await AsyncStorage.getItem('userToken')
      //userToken refers to patient code
      this.setState({patientCode: userToken});
    }

  //asking user for the permission to send notifications
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app install, 
      // so this will only ask on iOS

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // ! Get the token that uniquely identifies this device !
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server (in this case, firebase database) 
      // from where you can retrieve it to send push notifications.
      firebase.database().ref('patients/' + this.state.patientCode + '/push_token').set(token);
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  sendPushNotification = async() => {
    let notificationId = 
    Notifications.scheduleLocalNotificationAsync({
    title:"Exercise Reminder",
    body:"Don't forget to finish all your exercise sessions today!",
    sound:'default',
    vibrate:true,
    },
    {
    repeat:'hour',
    time: new Date().getTime() + 1.08e+7,
    }, 
    );  
  }



  handleToggleSwitch = () => {
    this.setState({switchValue:!this.state.switchValue});
  }

  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
    
  }
 
  render() {
    //if this switch is on, switchValue is true, sending notifications
    //if false, switch on the notifications
    if (this.state.switchValue){

      this.sendPushNotification();

    } else if (this.state.switchValue === false) {
      Notifications.cancelAllScheduledNotificationsAsync();
      //console.log('switched off');
    }

   
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('./Logo/Logo_forward.png')}
              style={styles.welcomeImage}
            />

            <Text style={styles.description2}>[ Tap the button below to switch on/off notifications ] </Text>

            <Switch
              trackColor = {{true:'#0B5BA3', false:'grey'}}
              onValueChange={this.handleToggleSwitch}
              value={this.state.switchValue}
              style={{marginTop:30, marginBottom:30, transform:[{scaleX:3}, {scaleY:2.4}]}}
            />
             <Text style={styles.description2}>
               Exercise reminder is currently {this.state.switchValue ? 'on' : 'off'}.
            </Text>
           
      
          </View>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding:20,
  },
  welcomeImage: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#0B5BA3',
    borderWidth:0.5,
    borderColor:'#fff',
    borderRadius:5,
    height:45,
    width:200,
    margin:8,
 },
 textStyle:{
  color:'#fff',
  marginBottom:4,
  marginLeft:27,
  fontSize:18,
  textAlign:'center',
},
inputCell:{
  margin:10,
  width: 250, 
  height: 50, 
  borderColor:'#0B5BA3',
  borderWidth:2,
  borderRadius:5,
},
description2:{
  fontSize: 18,
  fontWeight:'bold',
  color:'#0B5BA3',
  marginBottom:20,
  marginTop:20,
},
});



