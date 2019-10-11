import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

//for home screen menu
import HomeScreen from '../screens/PhysioScreens/HomeScreen';
import ExerciseLibraryScreen from '../screens/PhysioScreens/ExerciseLibraryScreen';
import CodeGeneratorScreen from '../screens/PhysioScreens/CodeGeneratorScreen';
import AssessmentScreen from '../screens/PhysioScreens/AssessmentScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ExerciseLibrary:ExerciseLibraryScreen,
  CodeGenerator:CodeGeneratorScreen,
  Assessment:AssessmentScreen,

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

//for exercise library stack
import ArmLyingSupine from '../screens/PhysioScreens/ExerciseVideoScreens/ArmLyingSupine';
import ArmResisted from '../screens/PhysioScreens/ExerciseVideoScreens/ArmResisted';
import ArmSeated from '../screens/PhysioScreens/ExerciseVideoScreens/ArmSeated';
import Balance from '../screens/PhysioScreens/ExerciseVideoScreens/Balance';
import LegsLying from '../screens/PhysioScreens/ExerciseVideoScreens/LegsLying';
import LegsResisted from '../screens/PhysioScreens/ExerciseVideoScreens/LegsResisted';
import LegsSeated from '../screens/PhysioScreens/ExerciseVideoScreens/LegsSeated';
import LegsStanding from '../screens/PhysioScreens/ExerciseVideoScreens/LegsStanding';
import Prescribe from '../screens/PhysioScreens/ExerciseVideoScreens/Prescribe';
import Remove from '../screens/PhysioScreens/ExerciseVideoScreens/Remove';
import PatientFeedback from '../screens/PhysioScreens/PatientFeedback';

const ExerciseLibraryStack = createStackNavigator({
  ExerciseLirary: ExerciseLibraryScreen,
  PatientFeedback:PatientFeedback,
  LS: ArmLyingSupine,
  ArmResisted:ArmResisted,
  Seated: ArmSeated,
  Balance: Balance,
  Lying: LegsLying,
  LegResisted: LegsResisted,
  LegSeated: LegsSeated,
  Standing: LegsStanding,
  Prescribe: Prescribe,
  Remove:Remove,

});

ExerciseLibraryStack.navigationOptions = {
  tabBarLabel: 'Exercise',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-videocam': 'md-videocam'
      }
    />
  ),
};

const CodeGeneratorStack = createStackNavigator({
  CodeGenerator: CodeGeneratorScreen,
});

CodeGeneratorStack.navigationOptions = {
  tabBarLabel: 'Code',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-barcode': 'md-barcode'
      }
    />
  ),
};

//for assessment stack
import NineHolePegTest from '../screens/PhysioScreens/AssessmentScreens/NineHolePegTest';
import BoxAndBlockTest from '../screens/PhysioScreens/AssessmentScreens/BoxAndBlockTest';
import TenMetreWalkTest from '../screens/PhysioScreens/AssessmentScreens/10MetreWalkTest';
import TwoMinuteWalk from '../screens/PhysioScreens/AssessmentScreens/TwoMinuteWalk';
import GripStrength from '../screens/PhysioScreens/AssessmentScreens/GripStrength';
import BergBalanceScale from '../screens/PhysioScreens/AssessmentScreens/BergBalanceScale';
import ShortBergBalanceScale from '../screens/PhysioScreens/AssessmentScreens/ShortBergBalanceScale';
import PosturalAssessmentScale from '../screens/PhysioScreens/AssessmentScreens/PosturalAssessmentScale';
import MotorAssessmentScale from '../screens/PhysioScreens/AssessmentScreens/MotorAssessmentScale';
import Tinetti from '../screens/PhysioScreens/AssessmentScreens/Tinetti';

const AssessmentStack = createStackNavigator({
  Assessment: AssessmentScreen,
  Nine: NineHolePegTest,
  Box: BoxAndBlockTest,
  Ten: TenMetreWalkTest,
  Two: TwoMinuteWalk,
  Grip: GripStrength,
  Berg: BergBalanceScale,
  Short: ShortBergBalanceScale,
  Postural: PosturalAssessmentScale,
  Motor: MotorAssessmentScale,
  Tinetti: Tinetti, 
});

AssessmentStack.navigationOptions = {
  tabBarLabel: 'Assessment',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-create': 'md-create'
      }
    />
  ),
};

export default createAppContainer(createBottomTabNavigator({
  HomeStack,
  ExerciseLibraryStack,
  AssessmentStack,
  CodeGeneratorStack,

}));
