import React from 'react';
import {
  Image,ScrollView,StyleSheet,
  Text,TouchableOpacity,View,AsyncStorage
} from 'react-native';

import {Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';



export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let title = 'Home';
    let headerStyle = {backgroundColor: '#0B5BA3' };
    let headerTintColor = ('#fff');
    let headerTitleStyle = {fontWeight:'bold', fontSize: 24 };
    
    return{title, headerStyle,headerTintColor,headerTitleStyle,}

  };

  constructor(props){
    super(props);
    this.state= {
      userToken:'',
    };
    this.loadPatientCode();
    
  }

      //first load in patient code from logging in record in asyncStorage 
      loadPatientCode = async() => {
        const userToken = await AsyncStorage.getItem('userToken')
        //userToken refers to patient code
        this.setState({userToken: userToken});
      }

  onMyExercisePress = () =>{
    this.props.navigation.navigate('MyExercise')
  }

  onMyTrackerPress = () =>{
    this.props.navigation.navigate('MyTracker')
  }

  onMyReminderPress = () =>{
    this.props.navigation.navigate('MyReminder')
  }

  render() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          {/* top box - logo image section */}
          <View style={styles.box1}>
                <View style={styles.welcomeContainer}>
                  <Image
                    source={require('./Logo/Logo_forward.png')}
                    style={styles.welcomeImage}
                  />
                </View>
          </View>

           {/* second box - contain three view boxes */}
          <View style={styles.box2}>
              <View style={styles.exerciseBox}>

                  <TouchableOpacity style={styles.button} onPress={this.onMyExercisePress}>
                            <Ionicons
                              name = 'ios-fitness'
                              size = {70}
                              color = '#fff'
                              />
                    <Text style={styles.textStyle1}>Exercise</Text>
                  </TouchableOpacity>
              </View> 

              <View style={styles.tracker}>

              <TouchableOpacity style={styles.button} onPress={this.onMyTrackerPress}>
                            <Ionicons
                              name = 'ios-trending-up'
                              size = {70}
                              color = '#fff'
                              />
                  <Text style={styles.textStyle2}>Tracker</Text>
              </TouchableOpacity>

              </View>

              <View style={styles.reminder}>

              <TouchableOpacity style={styles.button} onPress={this.onMyReminderPress}>
                    <Ionicons
                              name = 'ios-alarm'
                              size = {70}
                              color = '#fff'
                              />
                    <Text style={styles.textStyle3}>Reminder</Text>
                </TouchableOpacity>
              </View> 
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'stretch'
  },
  box1:{
    flex:0.35,
    justifyContent:'center',
    alignItems:'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
  box2:{
    flex:1,
    padding:30,
  },
  exerciseBox:{
    flex:1,
    padding:5
  },
  tracker:{
    flex:1,
    padding:5,
  },
  reminder:{
    flex:1,
    padding:5,

  },
  profile:{
    flex:1,
    padding:5,
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#0B5BA3',
    borderWidth:0.5,
    borderColor:'#fff',
    borderRadius:8,
    padding:20,
 },
 textStyle1:{
  color:'#fff',
  marginTop:5,
  marginLeft:50,
  fontSize:24,
  fontWeight:'bold',
  textAlign:'center',
},
textStyle2:{
  color:'#fff',
  marginTop:5,
  marginLeft:50,
  fontSize:24,
  fontWeight:'bold',
  textAlign:'center',
},
textStyle3:{
  color:'#fff',
  marginTop:5,
  marginLeft:57,
  fontSize:24,
  fontWeight:'bold',
  textAlign:'center',
},
textStyle4:{
    color:'#fff',
    marginTop:5,
    marginLeft:53,
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
  },

});
