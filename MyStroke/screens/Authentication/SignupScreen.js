import React from 'react';
import { StyleSheet, View, Text, TextInput,
        Alert, Image, TouchableOpacity,
         } from 'react-native';
import * as firebase from 'firebase';
import {KeyboardAwareScrollView} from  'react-native-keyboard-aware-scroll-view'


export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Physio SignUp',
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
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { alert('Your account has been created. Redirect to home page.') }, (error) => { Alert.alert(error.message); });
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
                    placeholder="   Enter an email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />


                <TextInput style={styles.inputCell}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="   Create a password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput style={styles.inputCell}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="   Enter your password again"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={this.onSignupPress}>
                    <Text style={styles.textStyle}>Sign Up</Text>
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
        marginLeft:35,
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
         width:150,
         margin:8,
      },
});