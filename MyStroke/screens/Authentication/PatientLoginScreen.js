import React from 'react';
import { StyleSheet, View, Text, TextInput,
        Image, TouchableOpacity, AsyncStorage,
         } from 'react-native';
import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'


export default class PatientLoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Patient Login',
        headerStyle:{
          backgroundColor: '#0B5BA3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight:'bold',
          fontSize: 22,
        },
    }
    constructor(props) {
        super(props);
        this.state = { 
            code: "",
        };
    }

    onLoginPress = async() => { 
        firebase.database().ref('patients').orderByKey()
        .equalTo(this.state.code).once('value',snapshot => {
            if(snapshot.exists()){
                const userToken = AsyncStorage.setItem('userToken', this.state.code)
                this.props.navigation.navigate('Patient')
            }
            else{
                alert("This code hasn't been activated. Please try again or check with your physio.");
            }
        
        });
    }

    onPhysioPress = () => {
        this.props.navigation.navigate('Login')
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

                <TextInput style={styles.inputCell}
                    value={this.state.activateCode}
                    onChangeText={(text) => { this.setState({code: text}) }}
                    placeholder="   Enter your login code"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={this.onLoginPress}>
                    <Text style={styles.textStyle}> Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onPhysioPress}>
                    <Text style={styles.textStyle2}>I am a physio</Text>
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
        marginBottom:20,
    },
    textStyle:{
      color:'#fff',
      marginBottom:4,
      marginLeft:50,
      fontSize:18,
      textAlign:'center',
    },
    textStyle2:{
        color:'#fff',
        marginBottom:4,
        marginLeft:20,
        fontSize:18,
        textAlign:'center',
      },
    inputCell:{
        margin:20,
        width: 220, 
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
       width:170,
       margin:8,
    },

});