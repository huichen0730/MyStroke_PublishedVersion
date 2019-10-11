//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
          Image,TextInput, ScrollView, 
          TouchableWithoutFeedback, Keyboard
         } from 'react-native';

import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'

// create a component
export default class PosturalAssessmentScale extends Component {
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
          maintainPosture:'',
          changePosture:'',
          totalScore:'',
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
              name: 'postural assessment scale',
              description: ['maintain a posture (_/15)',
                             'change a posture (_/21)',
                             'total score (_/36)'
                            ],
              patientCode: this.state.patientCode,
              maintainPosture: this.state.maintainPosture,
              changePosture: this.state.changePosture,
              totalScore: this.state.totalScore,
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
                <Text style = {styles.title}>Postural Assessment Scale</Text>

                <TextInput style={styles.inputCell}
                value={this.state.patientCode}
                onChangeText={(text) => {this.setState({patientCode: text}) }}
                placeholder="    Patient code"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />

                <Text style = {styles.textExplain}> Score for Maintain a Posture:</Text>

                <TextInput style={styles.inputCell2}
                value={this.state.maintainPosture}
                onChangeText={(text) => {this.setState({maintainPosture: text}) }}
                placeholder="    Score out of 15"
                keyboardType="numeric"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />

                <Text style = {styles.textExplain}> Score for Change a Posture:</Text>

                <TextInput style={styles.inputCell2}
                value={this.state.changePosture}
                onChangeText={(text) => {this.setState({changePosture: text}) }}
                placeholder="    Score out of 21"
                keyboardType="numeric"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                />

                <Text style = {styles.textExplain}> Total Score:</Text>

                <TextInput style={styles.inputCell2}
                value={this.state.totalScore}
                onChangeText={(text) => {this.setState({totalScore: text}) }}
                placeholder="    Score out of 36"
                keyboardType="numeric"
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


