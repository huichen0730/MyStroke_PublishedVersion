
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
      key:1, name:'Hip Extension 2', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fresisted%2FHipExtension2.mp4?alt=media&token=cf6f4ad0-11d5-40f9-adf8-5306fcd11d20',
    },
    {
      key:2, name:'Hip Flexion 2',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fresisted%2FHipFlexion2.mp4?alt=media&token=f972c52b-02b9-4f92-b316-be04e5f4c4bb'
    },
    {
      key:3, name:'Seated Knee Extension 2',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fresisted%2FSeatedKneeExtension2.mp4?alt=media&token=60e2e7f0-d95a-44bf-8329-0dfed86becf0'
    },
    {
      key:4, name:'Squat With Theraband 2',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fresisted%2FSquatwithTheraband2.mp4?alt=media&token=f5de3486-b1ef-4a26-8e15-f2b2f3599f49'
    },
    
];




export default class LegsResisted extends React.Component {
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

