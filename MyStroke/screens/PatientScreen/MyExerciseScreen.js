import React from 'react';
import {
  StyleSheet, AsyncStorage,
  Text,TouchableOpacity,View,FlatList, Dimensions,
} from 'react-native';

import * as firebase from 'firebase';
import { Video } from 'expo-av';

export default class MyExerciseScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let title = 'Exercise';
    let headerStyle = {backgroundColor: '#0B5BA3' };
    let headerTintColor = ('#fff');
    let headerTitleStyle = {fontWeight:'bold', fontSize: 24 };
    let headerRight = 
    (<TouchableOpacity 
        style={{backgroundColor:'#0B5BA3'}} 
        onPress={()=> {navigation.navigate('Feedback');}}>
          <Text style={{color:'#fff', fontSize:18, marginRight:15, }}>Feedback</Text>
        </TouchableOpacity>);

    return{title, headerStyle,headerTintColor,headerTitleStyle,headerRight}

  };

  constructor(props){
    super(props);
    this.state= {
      userToken:'', //this refers to patient code
      cDate:'',
      videos:[],  //an array videos
      loaded:undefined, //check if videos have all loaded and ready
      noVideo:undefined,  
    };
     //declaring a loadPatientCode method
     this.loadPatientCode()
    
  }

    //first load in patient code from logging in record in asyncStorage 
    loadPatientCode = async() => {
      const userToken = await AsyncStorage.getItem('userToken')
      //userToken refers to patient code
      this.setState({userToken: userToken});

      //get current date
        var c_date = new Date().getDate();
        var c_month = new Date().getMonth()+1;
        var c_year = new Date().getFullYear();
  
        this.setState({cDate:c_date + '/'+ c_month + '/' + c_year});
    }

  componentDidMount() {
      setTimeout(()=> {
        var videos = [];
        
        var refPath = firebase.database().
          ref('prescribe/'+ this.state.userToken); 
          
        refPath.on('value', (snapshot) => {
          if(snapshot.exists())
          {
            snapshot.forEach((item) => {
              var temp = item.val();
              videos.push(temp);
        
             })
            this.setState({videos:videos});
            this.setState({loaded:true});
           
          }else{
            this.setState({noVideo:true});
          } 

       });  
      }, 100) 
  }

  setCompletePress = (item) => {
     //compare the current date with the date stored in firebase
     var datePath = firebase.database().ref('tracker/'+this.state.userToken+'/' +item.name +'/date');
     datePath.once('value',(snapshot)=>{
       var fDate = snapshot.val(); //fDate is the date read from the firebase

       if (fDate !== this.state.cDate){ 
         //if the current date on the app is not the same as stored in the firebase for the exercise
         //reset tracker - current to 1 as patient pressed complete button once
         firebase.database().ref('tracker/'+ this.state.userToken + '/' +item.name).update({
          current: 1,
          date:this.state.cDate
        })

       } else{
        var path = firebase.database().ref('tracker/'+ this.state.userToken + '/' +item.name + '/' + 'current'); 
        path.once('value', (snapshot) => {
          var temp = parseInt(snapshot.val());  //read in the number of current and convert into a integer
          var updated = temp + 1;
    
          //then push updated value back by the path one layer higher
          firebase.database().ref('tracker/'+ this.state.userToken + '/' +item.name).update({
            current: updated
          })
       }); 

       }
     })
   alert('Well done for completing one session of the exercise!');
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
     
       <View style={styles.box}> 
        <Text style={styles.description2}>{item.set} sets of {item.rep}</Text>
        <Text style={styles.description2}>{item.session} sessions per day</Text>
        <Text style={styles.description2}>Comment: {item.note}</Text>
       </View> 

       <TouchableOpacity style={styles.button} onPress={this.setCompletePress.bind(this,item)}> 
              <Text style={styles.textStyle}>1 Session Completed</Text>
        </TouchableOpacity>
        </View>
    );
}
 
render() {
  if(this.state.loaded){
    return (
      <View style={styles.container}>
        <FlatList
                    data = {this.state.videos}
                    renderItem={this.renderVideoItem}
                    //keyExtractor={item => item.name}
                    keyExtractor={(item,index) => index.toString()}
                   
                    ItemSeparatorComponent={() => 
                        <View style={{backgroundColor:'#e0e0e0',height:1.5}}></View>} //separate lines 
                    stickySectionHeadersEnabled={false}  
                
                />
        </View>
    ); 
  } else if (this.state.noVideo){
    return(
      <View style={styles.container}>
        <Text style={styles.description}> Sorry, you haven't been prescribed with any exercise yet. </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
    padding:10,

  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#0B5BA3',
    borderWidth:0.5,
    borderColor:'#fff',
    borderRadius:5,
    height:50,
    width:220,
    margin:8,
 },
 textStyle:{
  color:'#fff',
  marginBottom:4,
  marginLeft:15,
  fontSize:15,
  fontWeight:'bold',
  textAlign:'center',
},
description:{
    marginTop:10,
    fontSize: 20,
    fontWeight:'bold',
    color:'#0B5BA3',
    marginBottom:15,
},
video:{
  marginTop: 10, 
  width: Dimensions.get('window').width - 50, 
  height: 200
},
box:{
  justifyContent:'center',
  alignItems:'flex-start',
  
},
description2:{
    fontSize: 18,
    fontWeight:'bold',
    color:'#0B5BA3',
    marginBottom:10,

},
description3:{
    fontSize: 16,
    color:'#0B5BA3',
    marginBottom:10,
},
  
});