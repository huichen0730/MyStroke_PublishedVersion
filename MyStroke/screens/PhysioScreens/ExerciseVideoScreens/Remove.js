//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
          Image,TextInput, ScrollView, 
          TouchableWithoutFeedback, Keyboard
         } from 'react-native';

import * as firebase from 'firebase';


const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
    {children}
  </TouchableWithoutFeedback>
)

// create a component
export default class Remove extends Component {
    static navigationOptions = {
        title: 'Remove Exercises',
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
          videoName:'',
        
        };
      }

      componentDidMount(){
        //load the patient code and the video name from previous page (one of the exercise)
        const { navigation } = this.props;
        const pCode = navigation.getParam('patientCode', '');
        const vName = navigation.getParam('videoName','');
        this.setState({patientCode:pCode, videoName:vName});
      }

    onSumbitPress = ()=> {
     if (this.state.patientCode){

        //first check if this patient has any prescribed exercises before removing videos
        firebase.database().ref('patients').orderByKey()
        .equalTo(this.state.patientCode).once('value',snapshot => {
        if(snapshot.exists()){
        //remove the video from the patient list
        firebase.database().ref('prescribe/'+ this.state.patientCode+ '/' + this.state.videoName).remove()
        //remove the relevant tracker record as well
        firebase.database().ref('tracker/'+this.state.patientCode+'/'+ this.state.videoName).remove()
                
              alert("This exercise video has been removed from the patient exercise list!"); 
                this.props.navigation.navigate('ExerciseLirary',{
                  patientCode:this.state.patientCode
                });
            
            }
            else{
                alert("This code hasn't been activated. Please create a code for this patient first before prescribing any exercise.");
                this.props.navigation.navigate('CodeGenerator');
            }
        });    

      }
      else {
        alert("Please fill in the patient code to remove a exercise from them")
      }
    
    }

    render() {
    

        return (
          <DismissKeyboard>
          <ScrollView>
            <View style={styles.container}>
              <Image source={require('../Logo/Logo_forward.png')}
                    style={styles.welcomeImage}>   
              </Image>
                 <Text style = {styles.title}>The exercise you want to remove is: </Text>
                <Text style = {styles.title2}>{this.state.videoName} </Text>
                <Text style = {styles.title}>The patient you want to remove from is: </Text>
                <Text style = {styles.title2}>{this.state.patientCode} </Text>
                <Text style = {styles.title2}>Press confirm to remove this exercise from the patient </Text>


            <TouchableOpacity style={styles.button} onPress={this.onSumbitPress}>
                <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
        
            </View>
            </ScrollView>
         </DismissKeyboard>
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
      marginTop:30,
      height:150,
      width:150,
  },
  textExplain:{
    //padding:20,
    marginTop: 20,
    fontSize:18,
    color:'#0B5BA3',
    textAlign:'left',
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
    height: 70, 
    borderColor:'#0B5BA3',
    borderWidth:2,
    borderRadius:5,
},
box:{
    flexDirection:'row',
    //padding:10

},
textExplain2:{
    marginTop:15,
    padding:5,
    fontSize:18,
    color:'#0B5BA3',
  },
inputCell3:{
    margin:5,
    width: 150, 
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
     width:130,
     margin:8,
  },
  textStyle:{
    color:'#fff',
    marginBottom:4,
    marginLeft:'15%',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
  },


});


