import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet, SectionList,
  Text,TouchableOpacity,View,TextInput, Dimensions, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import * as firebase from 'firebase';

import { Video, ScreenOrientation } from 'expo'
import Foundation from '@expo/vector-icons/Foundation';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
    {children}
  </TouchableWithoutFeedback>
)

export default class ExerciseLibraryScreen extends React.Component {
  
  static navigationOptions = ({navigation}) => {
    let title = 'Exercise Library';
    let headerStyle = {backgroundColor: '#0B5BA3' };
    let headerTintColor = ('#fff');
    let headerTitleStyle = {fontWeight:'bold', fontSize: 24 };
    let headerRight = 
    (<Foundation
      style = {{marginRight:30}}
      name = 'comment-video'
      size = {35}
      color = '#fff'
      onPress = {()=> {navigation.navigate('PatientFeedback');}}
    
    />);

    return{title, headerStyle,headerTintColor,headerTitleStyle,headerRight}

  };

  constructor(props){
    super(props);
    this.state= {
      patientCode:''
    };
    
  }

  // onswitchOrientationPress = () => {
  //   ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  // }
 componentDidMount(){
  const { navigation } = this.props;
  const pName = navigation.getParam('patientCode', '');
  this.setState({patientCode: pName});
 }

  //go to different exercise screens
  onRowPress = (item) => {
    switch (item) {
      case 'Lying (supine)':
        this.props.navigation.navigate('LS', {
          patientCode:this.state.patientCode
        });
        break;
      case 'Upper Limb Resisted':
          this.props.navigation.navigate('ArmResisted', {
            patientCode:this.state.patientCode
          });
          break;
      case 'Seated':
          this.props.navigation.navigate('Seated', {
            patientCode:this.state.patientCode
          });
          break;
          //'balance' in the main tab navigator leads to balance screen
      case 'Balance':
            this.props.navigation.navigate('Balance', {
              patientCode:this.state.patientCode
            });
            break;  
            //lower limb (legs) below  
      case 'Lying':
            this.props.navigation.navigate('Lying', {
              patientCode:this.state.patientCode
            });
            break;
      case 'Lower Limb Resisted':
              this.props.navigation.navigate('LegResisted', {
                patientCode:this.state.patientCode
              });
              break; 
      case 'Seated Exercises':
                this.props.navigation.navigate('LegSeated', {
                  patientCode:this.state.patientCode
                });
                break;     
      case 'Standing':
            this.props.navigation.navigate('Standing', {
              patientCode:this.state.patientCode
            });
            break;
      default:
        alert("Item didn't found");
    }
  }

  render() {
    var A = ['Lying (supine)', 'Upper Limb Resisted','Seated'];
    var B = ['Balance'];
    var C = ['Lying', 'Lower Limb Resisted','Seated Exercises','Standing'];

    return (
    <DismissKeyboard>
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.patientbox}>
              <Text style = {styles.title}>Enter the patient code to prescribe or remove exercises</Text>

              <TextInput style={styles.inputCell}
              value={this.state.patientCode}
              onChangeText={(text) => {this.setState({patientCode: text}) }}
              placeholder="    patient code"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              />
        </View>

      <SectionList
          //sections to fetch the variable A array data
          sections = {[
            {title:'Upper Limb', data: A},
            {title:'Balance', data: B},
            {title:'Lower Limb', data: C}
          ]}

          //showing the header title
          renderSectionHeader={ ({section}) =>
          <Text style= {styles.sectionHeader}> {section.title} </Text>}

          //showing the section data   
          renderItem= {({item}) => 
          <Text onPress={this.onRowPress.bind(this,item)}
                style = {styles.sectionItem}> {item} 
          </Text>
          }

          keyExtractor={(item,index) => index}

          ItemSeparatorComponent={() => 
              <View style={{backgroundColor:'#e0e0e0',height:1}}></View>} //分割线 
          
              stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
        />     

        </View>
        </ScrollView>
        </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    padding:20,
    marginTop: (Platform.OS == 'ios') ? 20:0,
    
  },
  patientbox:{
    justifyContent:'center',
    alignItems:'center'

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
 textStyle:{
  color:'#fff',
  marginBottom:4,
  marginLeft:20,
  fontSize:16,
  fontWeight:'bold',
  textAlign:'center',
},
sectionHeader:{
  fontSize: 20,
  fontWeight:'bold',
  backgroundColor: '#0B5BA3',
  color: '#fff',
  padding:10,
},
sectionItem:{
  fontSize: 18,
  fontWeight:'bold',
  color: '#0B5BA3',
  padding:10,
},
title:{
  //marginTop:10,
  fontSize: 20,
  fontWeight:'bold',
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
  
});
