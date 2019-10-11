import React from 'react';
import {
  ScrollView,StyleSheet, FlatList,
  Text,TouchableOpacity,View,AsyncStorage,RefreshControl,
} from 'react-native';

import * as firebase from 'firebase';

import {Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle'


export default class MyTrackerScreen extends React.Component {
  static navigationOptions = {
    title: 'Tracker',
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
      userToken:'', //this refers to patient code
      trackerRecords:[], //contains all the records for the completion of prescribed exercises
      loaded:undefined, //check if all the track records have all loaded and ready
      noRecord:undefined,  //check if someone has tracking record or not
      isFetching:false,  //for pull down to refresh the page
      totalCurrent:0,
      totalSession:0,
      resetFlag:false, //a flag to set total current and total session to 0 first before reading data again while refreshing
    };
     //declaring a loadPatientCode method
     this.loadPatientCode()
    
  }
  //first load in patient code from logging in record in asyncStorage 
  loadPatientCode = async() => {
    const userToken = await AsyncStorage.getItem('userToken')
    //userToken refers to patient code
    this.setState({userToken: userToken});
  }

  onsignOutPress = async () =>{
    AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Auth')
  }

  loadData = () => {
    setTimeout(()=> {
      var records = [];
      var refPath = firebase.database().ref('tracker/'+ this.state.userToken); 
      refPath.once('value', (snapshot) => {
        if(snapshot.exists())
        { //for each exercise prescribed under one certain patient code
          snapshot.forEach((item) => {
            var temp = item.val();
            //reading in and adding values to the local variables totalCurrent and totalSession
            this.setState({totalCurrent: (this.state.totalCurrent + parseInt(temp.current))});
            this.setState({totalSession: (this.state.totalSession + parseInt(temp.session))});
            //loading specifc data of each exercise in the array 'records' to be presented in a list
            records.push(temp);
           })
          this.setState({trackerRecords:records});
          this.setState({loaded:true});
         
        }else{
          this.setState({noRecord:true});
        }

        this.setState({isFetching:false});

   
      });
    }, 100)

  }

  componentDidMount (){
      this.loadData();
  }


  renderRecordItem = ({item}) => {
    return (
      <View style={styles.container2}>     

        <Text style={styles.description}> {item.name} </Text>
     
       <View style={styles.box}> 
        <Text style={styles.description2}>Today's Goal: {item.session} sessions</Text>
        <Text style={styles.description2}>Currently Completed: {item.current} </Text>
        <Text style={styles.description2}>Still Remain: { (parseInt(item.session) - item.current)} sessions</Text>
        
       </View> 

     </View>
    );
  }

  //to pull down refresh the page
  onRefresh(){
    this.setState({
      isFetching:true,
      resetFlag:true,
    }, function(){
         //if resetflag is true which will setstate after the first time loading the pie chart data
         if (this.state.resetFlag){
          this.setState({totalCurrent:0, totalSession:0});
        }
      this.loadData();
    }
    )
  }


  render() {
    if(this.state.loaded){
      return (
        <View style={styles.container}>
          <ScrollView 
              style={styles.container} contentContainerStyle={styles.contentContainer}
              refreshControl={
                <RefreshControl
                onRefresh={()=>this.onRefresh()}
                refreshing={this.state.isFetching} 
                />
              }
              >  
           
            <View style={styles.welcomeContainer}>
            <Text style={styles.description}> Today's Total Completion: </Text>
              <ProgressCircle
                          percent={(this.state.totalCurrent/this.state.totalSession) * 100}
                          radius={80}
                          borderWidth={20}
                          color="#0B5BA3"
                          shadowColor="#999"
                          bgColor="#fff"
                      >
                          <Text style={{ fontSize: 18, color:"#0B5BA3", fontWeight:'bold' }}>{this.state.totalCurrent}/{this.state.totalSession}</Text>
                      </ProgressCircle>
            
      

            <Text style={styles.description}> [Pull down to refresh the page] </Text>
  
              <FlatList
                      data = {this.state.trackerRecords}
                      renderItem={this.renderRecordItem}
                      keyExtractor={(item,index) => index.toString()}
                     
                      ItemSeparatorComponent={() => 
                          <View style={{backgroundColor:'#e0e0e0',height:1.5}}></View>} //separate lines 
                      stickySectionHeadersEnabled={false}  
                      
                  />
            
              <TouchableOpacity style={styles.button} onPress={this.onsignOutPress}>
                          <Ionicons
                                name = 'ios-power'
                                size = {30}
                                color = '#fff'
                                />
                  
                      <Text style={styles.textStyle}>Log Out</Text>
                  </TouchableOpacity>

            </View>
          </ScrollView>  
          </View>
      );

    } else if (this.state.noRecord){
      return(
        <View style={styles.container2}>
          <Text style={styles.description}> Sorry, currently you don't have any exercises to track. </Text>
          <TouchableOpacity style={styles.button} onPress={this.onsignOutPress}>
                          <Ionicons
                                name = 'ios-power'
                                size = {30}
                                color = '#fff'
                                />
                  
                      <Text style={styles.textStyle}>Log Out</Text>
                  </TouchableOpacity>
        </View>
      );
    } else{
      return(
        <View style={styles.container2}>
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
  },
  container2:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  welcomeImage: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#0B5BA3',
    borderWidth:0.5,
    borderColor:'#fff',
    borderRadius:8,
    padding:20,

},
textStyle:{
color:'#fff',
marginBottom:4,
marginLeft:27,
fontSize:18,
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
});
