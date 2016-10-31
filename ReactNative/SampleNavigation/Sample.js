/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import MyScene from './MyScene';

export default class SampleApp extends Component {
  render() {
    return (
      <Navigator 
       initialRoute={{ title: 'My Initial Scene', index: 0 }}
       renderScene={(route, navigator) =>
         <MyScene
           title={route.title}

           // Function to call when a new scene should be displayed
           onForward={ () => {
             const nextIndex = route.index + 1;
             navigator.push({
               title: 'Scene ' + nextIndex,
               index: nextIndex,
             });
           }}

           // Function to call to go back to the previous scene
           onBack={() => {
             if (route.index > 0) {
               navigator.pop();
             }
           }}
         />
       }
     />
    );
  }
}

AppRegistry.registerComponent('SampleApp', () => SampleApp);
