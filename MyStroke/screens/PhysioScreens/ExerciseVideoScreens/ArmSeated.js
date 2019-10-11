
import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet,FlatList,
  Text,TouchableOpacity,View,TextInput, Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const videos = [
    {
        key:1, name:'Assisted Hand Behind Back', 
        url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FAssistedHandBehindBack.mp4?alt=media&token=0ca65c99-07b4-4251-9e6f-5909df31229d',
    },
    {
        key:2, name:'Assisted Shoulder Flexion', 
        url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FAssistedShoulderFlexion.mp4?alt=media&token=765046d6-3aa8-4b8e-9f04-e951b3923823',
    },
    {
      key:3, name:'Bottle-Mouth', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FBottle-Mouth.mp4?alt=media&token=54f03fd1-0994-4c0d-a431-190c3c09e7bd',
   },
   {
      key:4, name:'Co-Ordination', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FCo-Ordination.mp4?alt=media&token=a6e6b509-4d7b-4e3c-b8d6-cbe756fe4b64',
   },
   {
      key:5, name:'Elbow FlexExtension', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FElbowFlexExt.mp4?alt=media&token=857a6b5f-cde0-4975-8dfb-cf8187386b1f',
    },
    {
      key:6, name:'Finger Abduction 2', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FFingerAbduction2.mp4?alt=media&token=422ef48c-1352-4000-95c0-3d37f38d19db',
    },
    {
      key:7, name:'Finger FlexExtension', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FFingerFlexExtension.mp4?alt=media&token=f7f809a4-05a5-41cd-9904-3a20089b2f14',
    },
    {
      key:8, name:'Hands Behind Back', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FHandsBehindBack.mp4?alt=media&token=2b5ae41f-2820-41c2-b75e-80a7934d5cf9',
    },    
    {
      key:9, name:'ProSupination', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FProSupination.mp4?alt=media&token=0f63358b-b96b-4fa9-9c40-2203bbc85ec7',
    },    
    {
      key:10, name:'Putty Finger Abduction', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FPuttyFingerAbduction.mp4?alt=media&token=a67428a3-1233-40d3-9cb0-9f6522fec0ca',
    },    
    {
      key:11, name:'Putty Pincer Grip', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FPuttyPincerGrip.mp4?alt=media&token=091717d2-7b6c-46b2-8d07-3c87a510343d',
    },    
    {
      key:12, name:'Rolling Putty', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FRollingPutty.mp4?alt=media&token=544e38f9-6f91-4662-8659-2fd8a656fdb5',
    },    
    {
      key:13, name:'Shoulder Abduction', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FShoulderAbduction.mp4?alt=media&token=442e85b3-0f84-4510-803e-c2d7ba181134',
    },
    {
      key:14, name:'Shoulder External Rotation', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FShoulderExternalRotation.mp4?alt=media&token=e833b732-2b42-4a05-8d2a-076a3f85fa5a',
    },
    {
      key:15, name:'Shoulder Flexion',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FShoulderFlexion.mp4?alt=media&token=77d77751-ef71-4cfe-bd83-e804bce2b57b'
    },
    {
      key:16, name:'Thumb Opposition',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FThumbOpposition.mp4?alt=media&token=bd165e0a-4a5a-4f95-a29a-bf238a1bc0da'
    },    
    {
      key:17, name:'Wringing Towel',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FWringingTowel.mp4?alt=media&token=6f4ffe16-316d-448a-baeb-f7319f02f444'
    },
    {
      key:18, name:'Wrist Flex Extension 3',
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Fseated%2FWristFlexExtension3.mp4?alt=media&token=6baf4d65-a447-4a6d-9246-b96551652582'
    }
 
];



export default class ArmSeated extends React.Component {
  static navigationOptions = {
    title: 'Seated',
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
         keyExtractor={item => 
              item.key.toString()}
         ItemSeparatorComponent={() => 
         <View style={
            {backgroundColor:'#e0e0e0',
             height:1.5}}></View>} 
         stickySectionHeadersEnabled={false} 
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

