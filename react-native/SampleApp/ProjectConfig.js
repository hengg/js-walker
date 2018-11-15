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
import Login from './Login';

export default class ProjectConfig extends Component{

  static defaultProps = {
    title: '添加'
  };

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds,
    };
    this._data = [];
    this.saveResponse = this.saveResponse.bind(this);
  }

  onDataArrived = (newData) => {
    for (var i = 0; i < this._data.length; i++) {
      if(this._data[i].projectname==newData.projectname){
        AlertIOS.alert('提示','该项目已存在。');
        return;
      }
    }
    this._data = this._data.concat(newData);
    this.setState({
      ds: this.state.ds.cloneWithRows(this._data)
    });

    let projectConfig = {
      projectname: newData.projectname,
      ip: newData.ip,
      logo: newData.logo
    };

   storage.save({
     key: 'projectConfig',
     id: newData.projectname,
     rawData: projectConfig
   });

  };

  onListItemPress(rowData) {
    let selectedProjectUrl=rowData.ip;
    global.selectedProjectUrl = selectedProjectUrl;
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: '用户登录',
        component: Login,
      })
    }
  }

  onListItemLongPress(rowData){
    AlertIOS.alert('是否删除',rowData.projectname,[{text: '确认', onPress: () => this.deleteSelectedProject(rowData)},{text: '取消'}]);
  }

  deleteSelectedProject(rowData){
    let newData=[]
    for (var i = 0; i < this._data.length; i++) {
      if(this._data[i] != rowData){
        newData.push(this._data[i]);
      }
    }
    this._data = newData;
    this.setState({
      ds: this.state.ds.cloneWithRows(this._data)
    });
    storage.remove({
      key: 'projectConfig',
      id: rowData.projectname
    });
  }

  renderRow(rowData){
     return(
       <TouchableOpacity onPress = {() =>this.onListItemPress(rowData)} onLongPress= {() =>this.onListItemLongPress(rowData)} underlayColor = "transparent" >
       <View style={styles.itemStyle}>
         <Image source={{uri:'https://facebook.github.io/react/img/logo_og.png'}} style={styles.imageStyle}/>
         <View style={styles.subItemStyle}>
           <Text style={{marginTop:5, fontSize:17}}>{rowData.projectname}</Text>
           <Text style={{marginBottom:5, fontSize:13, color:'green'}}>{rowData.ip}</Text>
         </View>
       </View>
       </TouchableOpacity>
     );
  }

  fetchData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.result==1) {
        let content = responseData.content;
        this.onDataArrived(content);
      }else {
        AlertIOS.alert("提示",responseData.message);
      }
    });
  }

  saveResponse(promptValue) {
    if (promptValue) {
      let getProjectUrl = GETPROJECTCONFIGDATA+promptValue;
      this.fetchData(getProjectUrl);
    }
  }

  componentWillMount() {
    storage.getAllDataForKey('projectConfig').then(data => {
      this._data = data;
      this.setState({
        ds: this.state.ds.cloneWithRows(this._data)
      });
    });
  }

  render() {
    var Dimensions = require('Dimensions');
    var { width, height } = Dimensions.get('window');

    return (
      <Image source={require('./img/background.png')} style={{width:width,height:height}}>
        <StatusBar backgroundColor="blue" barStyle="default"/>
        <View style={{height:30}}/>
        <ListView enableEmptySections={true} dataSource={this.state.ds} renderRow={this.renderRow.bind(this)} />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: styles.backgroundClear}}
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => AlertIOS.prompt('请输入项目代号', null, this.saveResponse)}>
          添加项目
        </Button>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.backgroundClear}>Copyright (c) 2013-present, Thtf, Inc.</Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundClear:{
    backgroundColor:'rgba(255, 255, 255, 0)'
  },
  container: {
            flex:1
  },
  itemStyle: {
            // 主轴方向
            flexDirection:'row',
            backgroundColor:'rgba(255, 255, 255, 0)'
        },
  imageStyle: {
            // 尺寸
            width:60,
            height:60,
            // 边距
            marginLeft:10,
            margin:10,
            backgroundColor:'rgba(255, 255, 255, 0)'
        },

  subItemStyle: {
            // 对齐方式
            justifyContent:'space-around'
  }
});
