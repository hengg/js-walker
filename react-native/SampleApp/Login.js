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
  TextInput,
  View,
  Switch,
  Navigator,
  ListView,
  Image,
  StatusBar,
  AlertIOS,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import ProjectConfig from './ProjectConfig';
import NetList from './NetList';

export default class Login extends Component{

  state = {
    switchIsOn: false,
    username:"",
    password:"",
    animating: false,
  };
  static defaultProps = {
    title: '登录'
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    storage.load({
        key: 'user',
        autoSync: true,
        syncInBackground: true
    }).then(ret => {
      this.setState({ username: ret.username });
      this.setState({ password: ret.password });
    }).catch(err => {
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
    storage.load({
        key: 'switchState',
        autoSync: true,
        syncInBackground: true
    }).then(ret => {
      this.setState({ switchIsOn: ret.state });
    }).catch(err => {
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
  }

  render(){
    var Dimensions = require('Dimensions');
    var { width, height } = Dimensions.get('window');

    return (
      <Image source={require('./img/background.png')} style={{width:width,height:height}}>
        <View style={{height:20}}/>
        <Button style={{fontSize:13,width:80,marginLeft:5,justifyContent:'flex-start'}} onPress={() => this.onBackButtonPress()}>🔙项目选择</Button>

        <View style={{height:height/3,width:width,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <TextInput style={styles.textInputStyle} defaultValue={this.state.username} placeholder="用户名" onChangeText={(text) => {this.setState({username:text});}}/>
          <TextInput style={styles.textInputStyle} defaultValue={this.state.password} secureTextEntry={true} placeholder="密码" onChangeText={(text) => {this.setState({password:text});}}/>
          <Button style={styles.buttonStyle} onPress={() => this.onLoginButtonPress()}>登录</Button>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:5}}>
            <Switch onValueChange={(value) => this.setState({switchIsOn: value})} value={this.state.switchIsOn} />
            <Text style={{backgroundColor:'rgba(255,255,255,0)'}}>记住用户名密码</Text>
          </View>
        </View>
        <ActivityIndicator
          animating={this.state.animating}
          style={ {height: 80}}
          size="large"
        />
        <View style={{width:width,height:height/2,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Image source={require('./img/logo_thtf.png')} style={{width:190,height:50}}/>
        </View>
      </Image>
    );
  }

  onBackButtonPress(){
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  onLoginButtonPress(){
    if (this.state.username==""||this.state.password=="") {
      AlertIOS.alert("提示","用户名密码不能为空！");
      return;
    }
    this.setState({ animating: true });
    switch (this.state.switchIsOn) {
      case true:
        //选择记住密码
        //如果已存储数据内有用户名密码数据，检查username是否一致
        //一致则跳过，不一致则删除原有数据记录新数据
        //如果不存在数据，记录数据
        storage.save({key: 'switchState',rawData: {state: true}});
        let userDataBeRead= {
          username: "",
          password: ""
        };
        storage.load({
            key: 'user',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
          if (ret.username!="") {
            userDataBeRead.username = ret.username;
            userDataBeRead.password = ret.password;
          }
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
        if (userDataBeRead.username!=this.state.username) {
          storage.save({key:'user',rawData: {
            username:this.state.username,
            password:this.state.password
          }});
        }
        break;
      case false:
        storage.remove({key: 'user'});
        storage.save({ key:'switchState',rawData: {state:false}});
        break;
      default:
        storage.remove({key: 'user'});
        storage.save({ key:'switchState',rawData: {state:false}});
    }
    let url = selectedProjectUrl+INITUSER+"?username="+this.state.username+"&password="+this.state.password+"&dataversion=001";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.loginstatus!=1) {
          AlertIOS.alert("提示","登录失败");
        }else {
          const { navigator } = this.props;
          if(navigator) {
            navigator.push({
              name: '热网列表',
              component: NetList,
            })
          }
        }
    });
    this.setState({ animating: false });

  }


}

const styles = StyleSheet.create({
  buttonStyle:{
    width:200,
    height:40,
    padding:10,
    marginTop:5,
    borderColor:'cornflowerblue',
    backgroundColor:'cornflowerblue',
    color:'white',
    borderWidth:1,
    borderRadius:5,
    overflow:'hidden'
  },
  textInputStyle:{
    width:200,
    height:40,
    padding:10,
    marginTop:5,
    borderWidth:1,
    borderRadius:5,
    borderColor:'white',
    backgroundColor:'white',
    alignSelf:'center'
  },
});
