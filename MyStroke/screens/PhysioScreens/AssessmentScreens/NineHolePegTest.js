//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
          Image,TextInput, ScrollView, 
          TouchableWithoutFeedback, Keyboard
         } from 'react-native';

import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'


// create a component
export default class NineHolePegTest extends Component {
    static navigationOptions = {
        title: '',
        headerStyle:{
          backgroundColor: '#0B5BA3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight:'bold',
          fontSize: 20,
        },
      };
      
      constructor(props){
        super(props);
        this.state = {
          patientCode:'',
          rightHandTime: '',
          leftHandTime:'',
          date:'',
        };
      }

      componentDidMount(){
        var c_date = new Date().getDate();
        var c_month = new Date().getMonth()+1;
        var c_year = new Date().getFullYear();
  
        this.setState({date:c_date + '/'+ c_month + '/' + c_year});
      }

   onSumbitPress = ()=> {
     if (this.state.patientCode){
          alert("The assessment form has been successfully submitted!"); 
    
          firebase.database().ref('assessment').push(
            {
              name: 'nine hole peg test',
              description: 'time taken to pull all pegs in and take them out',
              patientCode: this.state.patientCode,
              rightHandTime: this.state.rightHandTime,
              leftHandTime: this.state.leftHandTime,
              date:this.state.date,
            }
          )

          this.props.navigation.navigate('Assessment');

      }
      else {
        alert("Please fill in the patient code before you submit the assessment form")
      }

    }

    render() {
        return (
          <KeyboardAwareScrollView 
          keyboardShouldPersistTaps='always' 
          keyboardDismissMode='interactive'
          enableOnAndroid
          >
            <View style={styles.container}>
              <Image source={require('../Logo/Logo_forward.png')}
                    style={styles.welcomeImage}>   
              </Image>
                <Text style = {styles.title}>Nine Hole Peg Test</Text>

                <TextInput style={styles.inputCell}
                value={this.state.patientCode}
                onChangeText={(text) => {this.setState({patientCode: text}) }}
                placeholder="    Patient code"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />

                <Text style = {styles.textExplain}>Time taken to put all pegs and take them out:</Text>

                <TextInput style={styles.inputCell2}
                value={this.state.rightHandTime}
                onChangeText={(text) => {this.setState({rightHandTime: text}) }}
                placeholder="    Right hand"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />
                 <TextInput style={styles.inputCell2}
                value={this.state.leftHandTime}
                onChangeText={(text) => {this.setState({leftHandTime: text}) }}
                placeholder="    Left hand"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.button} onPress={this.onSumbitPress}>
                <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
        
            </View>
           
         </KeyboardAwareScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding:20,
    },
    title:{
        marginTop:20,
        fontSize: 20,
        fontWeight:'bold',
        color:'#0B5BA3',
  
    },
    welcomeImage: {
      marginTop:30,
      height:150,
      width:150,
  },
  textExplain:{
    //marginTop:10,
    padding:20,
    fontSize:18,
    color:'#0B5BA3',
  },
  inputCell:{
      margin:20,
      width: 200, 
      height: 50, 
      borderColor:'#0B5BA3',
      borderWidth:2,
      borderRadius:5,
  },
  inputCell2:{
    margin:10,
    width: 200, 
    height: 50, 
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
    marginLeft:20,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
  },


});


