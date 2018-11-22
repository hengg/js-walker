/**
 * ICAM
 * Copyright (c) 2016-present, Thtf, Inc.
 * All rights reserved.
 * author:wangliang
 * Init app ,the frist page of app is project config page
 * @flow
 */
'use strict'

import React, { Component } from 'react';
import {
  Navigator,
  AppRegistry,
} from 'react-native';
import ProjectConfig from './ProjectConfig';
// import Login from './Login';
import storage from './GlobalVariables'

class ICAM extends Component {
  render() {
    let projectConfig = ProjectConfig;
    return (
      <Navigator
              initialRoute={{ component: projectConfig }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromRight;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />

    )
  }
}

AppRegistry.registerComponent('SampleApp', () => ICAM);
