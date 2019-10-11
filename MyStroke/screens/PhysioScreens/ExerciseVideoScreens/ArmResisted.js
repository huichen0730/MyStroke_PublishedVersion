
import React from 'react';
import {
  Image,Platform,StyleSheet, FlatList,
  Text,TouchableOpacity,View,TextInput, Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const videos = [
    {
        key:1, name:'Seated Elbow Extension', 
        url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fresisted%2FSeatedElbowExtension.mp4?alt=media&token=1d28840a-ace3-40b3-ae03-0576ad4f3287',
    },
    {
      key:2, name:'Seated Elbow Extension 2',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fresisted%2FSeatedElbowExtension2.mp4?alt=media&token=795bb4a0-bece-4ca5-b1ea-336a61680d17'
    },
    {
      key:3, name:'Seated Shoulder Abduction',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fresisted%2FSeatedShoulderAbduction.mp4?alt=media&token=2ffb295b-a728-476c-8231-42b87ea0dd27'
    },
    {
      key:4, name:'Seated Shoulder External Rotation',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fresisted%2FSeatedShoulderExternalRotation.mp4?alt=media&token=0c58f536-23f7-471d-9171-acb43738b5e2'
    },
    {
      key:5, name:'Seated Shoulder Flexion',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fresisted%2FSeatedShoulderFlexion.mp4?alt=media&token=22bd00a9-c64f-4478-b48c-b3cb9f98cc4c'
    },
    
 
];




export default class ArmResisted extends React.Component {
  static navigationOptions = {
    title: 'Resisted',
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
      patientCode: '',
    };
    
  }

  componentDidMount() {
    
    const { navigation } = this.props;
    const pCode = navigation.getParam('patientCode', '');
    this.setState({patientCode:pCode});
  }

  renderVideoItem = ({item}) => {
    return (
        <View style={styles.container}>     
        <Video
          source = {{uri:item.url}}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay = {false}
          isLooping = {true}
          style = {styles.video}
          useNativeControls={true}
      //!! useNativeControls which use ios or android own video player tool
        />
       
       <Text style={styles.description}> {item.name} </Text>
            <View style={styles.icons}>
              <MaterialIcons
                                name = 'playlist-add'
                                size = {40}
                                color = '#0B5BA3'
                                onPress = {this.onPrescribePress.bind(this,item)}
                                
                            /> 
                            <Text>           </Text>
              <MaterialCommunityIcons
                                name = 'playlist-remove'
                                size = {40}
                                color = '#0B5BA3'
                                onPress = {this.onRemovePress.bind(this,item)}
                                
                            /> 
            </View>
        </View>

    );
}

//passing the video information as parameters to the prescribe page
onPrescribePress = (item) =>  {
  if(this.state.patientCode){
    this.props.navigation.navigate('Prescribe', {
      videoName: item.name,
      videoUrl: item.url,
      patientCode: this.state.patientCode,
    });
  }else{
    alert("Sorry, you haven't put the patient code yet. Go back to exercise library homepage to enter a patient code first.");
    
  }

}

//redirect to the page to confirm removing this video from the patient
onRemovePress = (item) =>  {
  if(this.state.patientCode){
    this.props.navigation.navigate('Remove', {
      videoName: item.name,
      patientCode: this.state.patientCode,
    });
  }else{
    alert("Sorry, you haven't put the patient code yet. Go back to exercise library homepage to enter a patient code first.");
    
  }

}

render() {
  return (
 
    <View style={styles.container}>

      <FlatList
                  data = {videos}
                  renderItem={this.renderVideoItem}
                  //keyExtractor={item => item.name}
                  keyExtractor={item => item.key.toString()}
                  ItemSeparatorComponent={() => 
                      <View style={{backgroundColor:'#e0e0e0',height:1.5}}></View>} //分割线 
                  
                  stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
              
              />


      </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
description:{
    marginTop:10,
    fontSize: 20,
    fontWeight:'bold',
    color:'#0B5BA3',
    marginBottom:20,
},
video:{
  marginTop: 20, 
  width: Dimensions.get('window').width - 50, 
  height: 200
},
icons:{
  flexDirection:'row',
}
  
});

