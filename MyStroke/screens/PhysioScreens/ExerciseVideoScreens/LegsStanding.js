
import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet, FlatList,
  Text,TouchableOpacity,View,TextInput, Dimensions
} from 'react-native';

//import { WebBrowser } from 'expo';


import * as firebase from 'firebase';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const videos = [
    {
      key:1, name:'Hip Abduction', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FHipAbduction.mp4?alt=media&token=67d5a45c-fcb8-4841-b02e-c377d4212994',
    },
    {
      key:2, name:'Hip Extension 2', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FHipExtension2.mp4?alt=media&token=f2cb7846-30ed-466e-bfe1-999ce5eb74f7',
    },
    {
      key:3, name:'Hip Flexion', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FHipFlex.mp4?alt=media&token=f8c10bd5-1595-4d06-bc72-5a9c3b5a1616',
    },
    {
      key:4, name:'Hip Flexion 2', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FHipFlex2.mp4?alt=media&token=00e7680e-febb-4aae-89cd-5772de259544',
    },
    {
      key:5, name:'Knee Flexion', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FKneeFlexion.mp4?alt=media&token=74dee676-9653-4ae0-bab1-6ce6a40a7129',
    },
    {
      key:6, name:'Plantarflexion 2', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FPlantarflexion2.mp4?alt=media&token=965b79c3-20d2-45a6-93d0-7d5315e55a94',
    },
    {
      key:7, name:'Squats',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FSquats.mp4?alt=media&token=db08e0ef-1dfd-45ab-920f-aa3b5ee25c9f'
    },
    {
      key:8, name:'Step Taps',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FStepTaps.mp4?alt=media&token=2f2abf3a-bc22-4715-b26b-bc836aa94a7f'
    },
    {
      key:9, name:'Step Ups',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/leg%2Fstanding%2FStepUps.mp4?alt=media&token=f4184e9e-d27a-46a8-8354-f3e4fbdf172b'
    },
];



export default class LegsStanding extends React.Component {
  static navigationOptions = {
    title: 'Standing',
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
          resizeMode={Video.RESIZE_MODE_COVER}
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

