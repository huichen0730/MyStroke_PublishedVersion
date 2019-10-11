
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
        key:1, name:'Assisted Shoulder Flexion', 
        url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Flying%20(supine)%2FAssistedShoulderFlexion.mp4?alt=media&token=2a0410e7-fd8f-482f-9edd-331a41324750',
    },
    {
      key:2, name:'Elbow FlexExtension', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Flying%20(supine)%2FElbowFlexExtension.mp4?alt=media&token=c560176b-7f4b-42bf-b105-cd315f9a42a3',
    },
    {
        key:3, name:'Hand Behind Head', 
        url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Flying%20(supine)%2FHandBehindHead.mp4?alt=media&token=1181dbe5-cefb-4f01-8c88-683114abdc20',
    },
    {
      key:4, name:'Shoulder Abduction', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Flying%20(supine)%2FShoulderAbduction.mp4?alt=media&token=0e13654e-92aa-4a79-99ce-7ccf84e1b453',
    },
    {
      key:5, name:'Shoulder Flexion', 
      url:'https://firebasestorage.googleapis.com/v0/b/mystroke.appspot.com/o/arm%2Flying%20(supine)%2FShoulderFlexion.mp4?alt=media&token=51381847-e04f-4b40-a291-f51812f09724',
    },
 
];


export default class ArmLyingSupine extends React.Component {
  static navigationOptions = {
    title: 'Lying (supine)',
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
      patientCode:'',
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
                <View style={{backgroundColor:'#e0e0e0',height:1.5}}></View>} 
            
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
    marginBottom:10,
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

