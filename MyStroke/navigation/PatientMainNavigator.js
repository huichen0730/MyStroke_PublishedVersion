import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';


import PatientHomeScreen from '../screens/PatientScreen/PatientHomeScreen';
import MyExerciseScreen from '../screens/PatientScreen/MyExerciseScreen';
import MyTrackerScreen from '../screens/PatientScreen/MyTrackerScreen';
import MyReminderScreen from '../screens/PatientScreen/MyReminderScreen';

const HomeStack = createStackNavigator({
  PatientHome: PatientHomeScreen,
  MyExercise: MyExerciseScreen,
  MyTracker: MyTrackerScreen,
  MyReminder: MyReminderScreen,
 
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home': 'md-home'
      }
    />
  ),
};

import MyFeedback from '../screens/PatientScreen/MyFeedback';

const MyExerciseStack = createStackNavigator({
  MyExercise: MyExerciseScreen,
  Feedback:MyFeedback,
});

MyExerciseStack.navigationOptions = {
  tabBarLabel: 'Exercise',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-fitness': 'md-fitness'
      }
    />
  ),
};

const MyTrackerStack = createStackNavigator({
  MyTracker: MyTrackerScreen,
});

MyTrackerStack.navigationOptions = {
  tabBarLabel: 'Tracker',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-trending-up': 'md-trending-up'
      }
    />
  ),
};

const MyReminderStack = createStackNavigator({
  MyReminder: MyReminderScreen,
});

MyReminderStack.navigationOptions = {
  tabBarLabel: 'Reminder',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-alarm': 'md-alarm'
      }
    />
  ),
};


export default createAppContainer(createBottomTabNavigator({
  HomeStack,
  MyExerciseStack,
  MyTrackerStack,
  MyReminderStack,
  
}));
