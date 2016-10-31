/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//index.ios.js
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

//MyScene.js
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>点我进入下一场景</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>点我返回上一场景</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
