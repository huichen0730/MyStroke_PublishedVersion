//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
          Image,TextInput, ScrollView, 
          TouchableWithoutFeedback, Keyboard
         } from 'react-native';

import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'

export default class Prescribe extends Component {
    static navigationOptions = {
        title: 'Prescribe Exercises',
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
          rep:'',
          set:'',
          session:'',
          note:'',
          date:'',
        };
      }

      componentDidMount(){
        var c_date = new Date().getDate();
        var c_month = new Date().getMonth()+1;
        var c_year = new Date().getFullYear();
  
        this.setState({date:c_date + '/'+ c_month + '/' + c_year});
        //load the patient code from previous page (one of the exercise)
        const { navigation } = this.props;
        const pCode = navigation.getParam('patientCode', '');
        this.setState({patientCode:pCode});
      }

    onSumbitPress = ()=> {
     if (this.state.patientCode){

        //first check if this patient code exists before prescrbing videos
        firebase.database().ref('patients').orderByKey()
        .equalTo(this.state.patientCode).once('value',snapshot => {
            if(snapshot.exists()){
                //prescribe videos for the patient
                alert("The exercise video has been successfully prescribed to the patient!"); 
                
                //load the video info from previous exercise page 
                const { navigation } = this.props;
                const vName = navigation.getParam('videoName', '');
                const Url = navigation.getParam('videoUrl', '');
      
                firebase.database().ref('prescribe/'+ this.state.patientCode+ '/' + vName).set(
                  {
                    url: Url,
                    name:vName,
                    rep: this.state.rep,
                    set:this.state.set,
                    session:this.state.session,
                    note: this.state.note,
                    date:this.state.date,
                  }
                )
                
                //for setting up the tracker, need to know which video, with how many sessions need to complete for which patient
                firebase.database().ref('tracker/'+this.state.patientCode+'/'+ vName).set(
                    {
                        name:vName,
                        session:this.state.session,
                        current: 0,
                        date:this.state.date
                    }
                )

                
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
        alert("Please fill in the patient code to prescribe exercise videos")
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
                <Text style = {styles.title}>The patient you are prescribing to is: </Text>
                <Text style = {styles.title2}>{this.state.patientCode} </Text>


                <View style = {styles.box}>

                    <Text style = {styles.textExplain2}>  Rep:</Text>

                    <TextInput style={styles.inputCell3}
                    value={this.state.rep}
                    onChangeText={(text) => {this.setState({rep: text}) }}
                    placeholder="   how many"
                    keyboardType="numeric"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                </View>

                <View style = {styles.box}>

                    <Text style = {styles.textExplain2}>   Set:</Text>

                    <TextInput style={styles.inputCell3}
                    value={this.state.set}
                    onChangeText={(text) => {this.setState({set: text}) }}
                    placeholder="   how many"
                    keyboardType="numeric"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    />

                </View>

                <View style = {styles.box}>

                  <Text style = {styles.textExplain2}>Daily:</Text>

                  <TextInput style={styles.inputCell3}
                  value={this.state.session}
                  onChangeText={(text) => {this.setState({session: text}) }}
                  placeholder="   how often"
                  keyboardType="numeric"
                  clearButtonMode="always"
                  autoCapitalize="none"
                  autoCorrect={false}
                  />

                  </View>

                <Text style = {styles.textExplain}>Comment:</Text>

                <TextInput style={styles.inputCell2}
                value={this.state.note}
                onChangeText={(text) => {this.setState({note: text}) }}
                placeholder="    any note for patient"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                />

            <TouchableOpacity style={styles.button} onPress={this.onSumbitPress}>
                <Text style={styles.textStyle}>Add</Text>
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
     width:100,
     margin:8,
  },
  textStyle:{
    color:'#fff',
    marginBottom:4,
    marginLeft:'25%',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
  },


});


