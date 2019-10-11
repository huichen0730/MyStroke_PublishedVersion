import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet,
  Text,TouchableOpacity,View,TextInput, Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../../components/StyledText';
import {Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';


export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let title = 'Home';
    let headerStyle = {backgroundColor: '#0B5BA3' };
    let headerTintColor = ('#fff');
    let headerTitleStyle = {fontWeight:'bold', fontSize: 24 };
    let headerRight = 
    (<TouchableOpacity 
        style={{backgroundColor:'#0B5BA3'}} 
        onPress={() => firebase.auth().signOut()}>
          <Text style={{color:'#fff', fontSize:18, marginRight:15, marginBottom:5}}>Log Out</Text>
        </TouchableOpacity>);

    return{title, headerStyle,headerTintColor,headerTitleStyle,headerRight}

  };

  constructor(props){
    super(props);
    this.state= {

    };
    
  }


  onExerciseLibraryPress = () =>{
    this.props.navigation.navigate('ExerciseLibrary')
  }

  onCodeGeneratorPress = () =>{
    this.props.navigation.navigate('CodeGenerator')
  }

  onAssessmentPress = () =>{
    this.props.navigation.navigate('Assessment')
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

                  <TouchableOpacity style={styles.button} onPress={this.onExerciseLibraryPress}>
                            <Ionicons
                              name = 'ios-videocam'
                              size = {70}
                              color = '#fff'
                              />
                    <Text style={styles.textStyle1}>Exercise Library</Text>
                  </TouchableOpacity>
              </View> 

              <View style={styles.assessment}>

              <TouchableOpacity style={styles.button} onPress={this.onAssessmentPress}>
                            <Ionicons
                              name = 'ios-create'
                              size = {70}
                              color = '#fff'
                              />
                  <Text style={styles.textStyle3}>Assessment</Text>
              </TouchableOpacity>

              </View>

              <View style={styles.codeGenerator}>

              <TouchableOpacity style={styles.button} onPress={this.onCodeGeneratorPress}>
                    <Ionicons
                              name = 'ios-barcode'
                              size = {70}
                              color = '#fff'
                              />
                    <Text style={styles.textStyle2}>Patient Code</Text>
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
    marginTop: 30,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
  box2:{
    flex:1,
    padding:20,
  },
  exerciseBox:{
    flex:1,
    padding:5
  },
  codeGenerator:{
    flex:1,
    padding:5,
  },
  assessment:{
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
  marginBottom:4,
  marginLeft:27,
  //marginLeft:'25%',
  fontSize:22,
  fontWeight:'bold',
  textAlign:'center',
},
textStyle2:{
  color:'#fff',
  marginBottom:4,
  marginLeft:35,
  //marginLeft:'25%',
  fontSize:22,
  fontWeight:'bold',
  textAlign:'center',
},
textStyle3:{
  color:'#fff',
  marginLeft:35,
  //marginLeft:'25%',
  fontSize:22,
  fontWeight:'bold',
  textAlign:'center',
},

});
