/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, { Component , PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ListView,
  Image,
  StatusBar,
  AlertIOS,
  Alert,
  TouchableOpacity,
  SwipeableListView
} from 'react-native';
import Button from 'react-native-button';
import AddProjects from "./AddProjects"

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

class initProjects extends Component{

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

  _onDataArrived = (newData) => {
    this._data = this._data.concat(newData);
    this.setState({
      ds: this.state.ds.cloneWithRows(this._data)
    });
  };

  onButtonPress() {
    Alert.alert('Button has been pressed!');
  }

  onListItemPress(rowData) {
     Alert.alert(rowData.projectname);
  }

  onListItemLongPress(rowData){
    Alert.alert(
            '是否删除',
            rowData.projectname,
            [
              {text: '确认', onPress: () => console.log('OK Pressed!')},
              {text: '取消'}
            ]
          )
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
        this._onDataArrived(content);
        // Alert.alert(content.logo);
      }else {
        Alert.alert("提示",responseData.message);
      }
    });
  }

  saveResponse(promptValue) {
    if (promptValue) {
      let getProjectUrl = "http://22.22.22.155/Service.svc/GetMobilePhoneAppResource/ProjectNo="+promptValue;
      this.fetchData(getProjectUrl);
    }
  }

  render() {
    var Dimensions = require('Dimensions');
    var { width, height } = Dimensions.get('window');

    return (
      <Image source={require('./background.png')} style={{width:width,height:height}}>
        <StatusBar backgroundColor="blue" barStyle="default"/>
        <View style={{height:30}}/>
        <ListView dataSource={this.state.ds} renderRow={this.renderRow.bind(this)} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.backgroundClean}>Copyright (c) 2013-present, Thtf, Inc.</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: styles.backgroundClean}}
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => AlertIOS.prompt('请输入项目代号', null, this.saveResponse)}>
          添加项目
        </Button>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: styles.backgroundClean}}
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onButtonPress()}>
          编辑
        </Button>
        </View>
      </Image>
    );
  }
}


const styles = StyleSheet.create({
  backgroundClean:{
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


AppRegistry.registerComponent('SampleApp', () => initProjects);
