import React from 'react';
import {
  Image,Platform,ScrollView,StyleSheet, FlatList,
  Text,TouchableOpacity,View,TextInput,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';

//import { WebBrowser } from 'expo';


//import * as firebase from 'firebase';


export default class AssessmentScreen extends React.Component {
  static navigationOptions = {
    title: 'Assessment',
    headerStyle:{
      backgroundColor: '#0B5BA3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold',
      fontSize: 24,
    },
  };

  constructor(props) {
    super(props);
    this.state = { 
      
    }
  }

  //go to different assessment screens
  onRowPress = (item) => {
    switch (item) {
      case 'Nine Hole Peg Test':
        this.props.navigation.navigate('Nine');
        break;
      case 'Box and Block Test':
          this.props.navigation.navigate('Box');
          break;
      case 'Ten Metre Walk Test':
            this.props.navigation.navigate('Ten');
            break;
      case 'Two Minute Walk':
            this.props.navigation.navigate('Two');
            break;
      case 'Grip Strength':
            this.props.navigation.navigate('Grip');
            break;
      case 'Berg Balance Scale':
            this.props.navigation.navigate('Berg');
            break;
      case 'Short Berg Balance Scale':
            this.props.navigation.navigate('Short');
            break;
      case 'Postural Assessment Scale':
            this.props.navigation.navigate('Postural');
            break;
      case 'Motor Assessment Scale (Upper Limb Section)':
            this.props.navigation.navigate('Motor');
            break;
      case 'Tinetti':
            this.props.navigation.navigate('Tinetti');
            break;
      default:
        alert("Item didn't found");
    }
  }


  render() {
    //assessment list - array
    var A = ['Berg Balance Scale','Box and Block Test','Grip Strength',
             'Motor Assessment Scale (Upper Limb Section)','Nine Hole Peg Test', 
             'Postural Assessment Scale', 'Short Berg Balance Scale',
             'Ten Metre Walk Test','Tinetti', 'Two Minute Walk', ];
    return (
      <View style={styles.container}>
                <FlatList
                    data = {A}
                    renderItem= {({item}) => 
                    <Text onPress={this.onRowPress.bind(this,item)}
                          style = {styles.sectionItem}> {item} 
                    </Text>
                    }
                    keyExtractor={(item,index) => index.toString()}
                   
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
    flex:1,
    justifyContent:'center',
    padding:20,
    marginTop: (Platform.OS == 'ios') ? 20:0,
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
  
});
 