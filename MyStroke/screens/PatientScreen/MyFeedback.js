import React from 'react';
import {
  Image,ScrollView,StyleSheet,
  Text,TouchableOpacity,View,TextInput,
  TouchableWithoutFeedback, Keyboard, AsyncStorage,
} from 'react-native';

import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
      {children}
    </TouchableWithoutFeedback>
  )


export default class MyFeedback extends React.Component {
  static navigationOptions = {
    title: 'Feedback',
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
        userToken:'', //this refers to patient code
        feedback:'',
        cDate:'',

    };
     //declaring a loadPatientCode method
     this.loadPatientCode()  
  }
   //first load in patient code from logging in record in asyncStorage 
   loadPatientCode = async() => {
    const userToken = await AsyncStorage.getItem('userToken')
    //userToken refers to patient code
    this.setState({userToken: userToken});

    //get current date
      var c_date = new Date().getDate();
      var c_month = new Date().getMonth()+1;
      var c_year = new Date().getFullYear();

      this.setState({cDate:c_date + '/'+ c_month + '/' + c_year});
  }

  onSumbitPress = () => {
      firebase.database().ref('feedback').push({
          feedback:this.state.feedback,
          patient: this.state.userToken,
          date:this.state.cDate,
      })
      alert('Thank you for your feedback.');
      this.props.navigation.navigate('MyExercise');

  }


  render() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
        <ScrollView>
          <View style={styles.container}>
            <Image source={require('./Logo/Logo_forward.png')}
                  style={styles.welcomeImage}>   
            </Image>
              <Text style = {styles.title}>Leave your feedback below: </Text>
              <Text style = {styles.title2}>(anything in general or about a particular exercise) </Text>
    

              <TextInput style={styles.inputCell2}
              value={this.state.feedback}
              onChangeText={(text) => {this.setState({feedback: text}) }}
              placeholder="    write your feedback here"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              />

          <TouchableOpacity style={styles.button} onPress={this.onSumbitPress}>
              <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
      
          </View>
          </ScrollView>
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding:10,
    },
    title:{
        marginTop:20,
        fontSize: 20,
        fontWeight:'bold',
        color:'#0B5BA3',
  
    },
    title2:{
        marginTop:5,
        fontSize: 18,
        fontWeight:'bold',
        color:'#0B5BA3',
        marginBottom:20,
        textDecorationLine: 'underline',
    },
  
    welcomeImage: {
      marginTop:20,
      height:100,
      width:100,
  },
  inputCell2:{
    margin:10,
    width: 250, 
    height: 80, 
    borderColor:'#0B5BA3',
    borderWidth:2,
    borderRadius:5,
},
  button:{
     flexDirection:'row',
     alignItems:'center',
     backgroundColor:'#0B5BA3',
     borderWidth:0.5,
     borderColor:'#fff',
     borderRadius:5,
     height:45,
     width:120,
     margin:8,
  },
  textStyle:{
    color:'#fff',
    marginBottom:4,
    marginLeft:'20%',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
  },
});
