import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet,
  Text,TouchableOpacity,View,TextInput,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';



export default class CodeGeneratorScreen extends React.Component {
  static navigationOptions = {
    title: 'Patient Code',
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
      patientInitials: "",
      patientCode:"",
    };
    
  }

  patientCodeGenerator=()=> {
    //generate the random number in 4 digits in the form of string
    var RandomNumber = 
    (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    //combine the initials with random number to become the patient code
    this.setState({patientCode : this.state.patientInitials + RandomNumber})

 }

  onGeneratePress = () => {
    if (this.state.patientInitials)
    {
          //callling the generate patient code generator function
        this.patientCodeGenerator();

        setTimeout(()=> {
          alert("The Patient Code is:" + this.state.patientCode); 

          firebase.database().ref('patients/' + this.state.patientCode).set(
            {
              initials: this.state.patientInitials
            }
          ).then(() => {
            //console.log('Inserted ' + this.state.patientCode);
            }).catch((error) => {
            alert(error);
            })

            this.props.navigation.navigate('Home');
        }, 100) 

    } else {
      alert('Sorry, please enter the patient initials first');
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
            <Image source={require('./Logo/Logo_forward.png')}
                    style={styles.welcomeImage}>   
            </Image>

            <Text style={styles.textExplain}> Enter a patient's initials to generate a patient code: </Text>

            <TextInput style={styles.inputCell}
                value={this.state.patientInitials}
                onChangeText={(text) => {this.setState({patientInitials: text}) }}
                placeholder="    Enter two capital letters"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.button} onPress={this.onGeneratePress}>
                <Text style={styles.textStyle}> Generate</Text>
            </TouchableOpacity>

            </View>
    </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#fff',
},
welcomeImage: {
    marginTop:30,
    height:150,
    width:150,
},
textStyle:{
  color:'#fff',
  marginBottom:4,
  marginLeft:20,
  fontSize:18,
  fontWeight:'bold',
  textAlign:'center',
},
textExplain:{
  marginTop:20,
  padding:20,
  fontSize:18,
  color:'#0B5BA3',

},
inputCell:{
    margin:20,
    width: 230, 
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
   width:150,
   margin:8,
},

});