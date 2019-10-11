import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert,
        TouchableOpacity, Image,
         } from 'react-native';
import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'


export default class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Forgot Password',
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
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset request has been sent to your email.");
            }, (error) => {
                Alert.alert(error.message);
            });
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
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="   Enter the email you used to register"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={this.onResetPasswordPress}>
                    <Text style={styles.textStyle}>Reset the Password</Text>
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
      marginLeft:10,
      fontSize:18,
      textAlign:'center',
    },
    textStyle2:{
        color:'#fff',
        marginBottom:4,
        marginLeft:45,
        fontSize:14,
        textAlign:'center',
      },
    inputCell:{
        margin:20,
        width: 310, 
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
       width:210,
       margin:8,
    },

});