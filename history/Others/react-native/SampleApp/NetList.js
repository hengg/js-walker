/**
 * ICAM
 * Copyright (c) 2016-present, Thtf, Inc.
 * All rights reserved.
 * author:wangliang
 *
 * @flow
 */
'use strict'

import React, { Component , PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  Image,
  StatusBar,
  AlertIOS,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Button from 'react-native-button';
// import Login from './Login';

export default class NetList extends Component{

  render() {
    var Dimensions = require('Dimensions');
    var { width, height } = Dimensions.get('window');

    return (
      <Image source={require('./img/background.png')} style={{width:width,height:height}}>
        <View style={{height:20}}/>
        <Button style={{fontSize:13,width:80,marginLeft:5,justifyContent:'flex-start'}} onPress={() => this.onBackButtonPress()}>🔙切换用户</Button>
      </Image>
    )
  }

  onBackButtonPress(){
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

}
