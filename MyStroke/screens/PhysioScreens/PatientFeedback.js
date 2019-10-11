import React from 'react';
import {
  Image,Platform,StyleSheet, AsyncStorage,
  Text,TouchableOpacity,View,TextInput,FlatList, Dimensions,
} from 'react-native';

import * as firebase from 'firebase';



export default class PatientFeedback extends React.Component {
  static navigationOptions = {
    title: 'Exercise Feedback',
    headerStyle:{
      backgroundColor: '#0B5BA3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold',
      fontSize: 22,
    },

  };
 

  constructor(props){
    super(props);
    this.state= {
      cDate:'',
      feedback:[],  //an array videos
      loaded:undefined, //check if videos have all loaded and ready
      nofeedback:undefined,  
    };

  }

  componentDidMount() {

        var feedback = [];
        
        var refPath = firebase.database().ref('feedback').orderByChild('patient'); 
        refPath.on('value', (snapshot) => {
          if(snapshot.exists())
          {
            snapshot.forEach((item) => {
              var temp = item.val();
      
              feedback.push(temp);
        
             })
            this.setState({feedback:feedback});
            this.setState({loaded:true});
           
          }else{
            this.setState({nofeedback:true});
          } 

       });  
 
  }
  
  renderFeedbackItem = ({item}) => {
    return (
        <View style={styles.container}> 
            <Image style={styles.image}
                   source={require('./Logo/Logo_forward.png')}
                />  

            <View style={styles.content}>
                <View style = {styles.contentHeader}>
                    <Text style={styles.name}> Patient {item.patient} </Text>
                </View>
                <Text style={styles.time}> commented on {item.date} </Text>
                <Text style={styles.feedback}> {item.feedback} </Text>
            </View>      

        </View>
    );
}
 
render() {
  if(this.state.loaded){
    return (
      <View style={styles.container1}>
        <FlatList
                    data = {this.state.feedback}
                    renderItem={this.renderFeedbackItem}
                    //keyExtractor={item => item.name}
                    keyExtractor={(item,index) => index.toString()}
                   
                    ItemSeparatorComponent={() => 
                        <View style={{backgroundColor:'#e0e0e0',height:1.5}}></View>} //分割线 
                    stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
                
                />
        </View>
    ); 
  } else if (this.state.nofeedback){
    return(
      <View style={styles.container}>
        <Text style={styles.description}> Sorry, there is no patient giving any feedback yet. </Text>
      </View>
    );
  } else{
    return(
      <View style={styles.container}>
        <Text style={styles.description}> Loading... </Text>
      </View>
    );
   }
    
  }
}

const styles = StyleSheet.create({
    container1:{
        flex: 1,
    },

  container: {
    
    // backgroundColor: '#fff',
    // justifyContent:'center',
    // alignItems:'center',
    // padding:10,
    paddingLeft:19,
    paddingRight:16,
    paddingVertical:12,
    flexDirection:'row',
    alignItems:'flex-start'

  },
  content:{
      marginLeft:16,
      flex:1,

  },
  contentHeader:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:6

  },
  image:{
      width:50,
      height:50,
      borderRadius:10,
      //marginLeft:20,

  },
  name:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0B5BA3'
},
  time:{
      fontSize:12,
      color:'#808080',
      marginBottom:20,
  },
  feedback:{
      fontSize:16,
  },
  
});