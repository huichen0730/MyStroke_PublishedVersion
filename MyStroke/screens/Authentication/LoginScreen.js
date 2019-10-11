import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image, ScrollView,
        TouchableOpacity,} from 'react-native';
import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'

//this screen for physio admin login

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Physio Login',
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
            password: "",
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onForgotPasswordPress = () => {
        this.props.navigation.navigate('ForgotPassword')
    }

    onToSignupPress = () => {
        this.props.navigation.navigate('SignUp')
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
                    placeholder="   Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput style={styles.inputCell}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="   Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={this.onLoginPress}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.onForgotPasswordPress}>
                    <Text style={styles.textStyle2}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.onToSignupPress}>
                    <Text style={styles.textStyle3}>Sign Up</Text>
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
        marginBottom: 20,
    },
    textStyle:{
        color:'#fff',
        marginBottom:4,
        marginLeft:70,
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
        textStyle3:{
            color:'#fff',
            marginBottom:4,
            marginLeft:60,
            fontSize:18,
            textAlign:'center',
          },
      inputCell:{
          margin:10,
          width: 250, 
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
         width:200,
         margin:8,
      },
  

});

