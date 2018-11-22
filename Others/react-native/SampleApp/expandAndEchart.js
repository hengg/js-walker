'use strict';
import React, {
    Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

import Echarts from 'native-echarts';

class Expander extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: {},
            dir: 'row'
        };
    }

    componentWillMount() {
        this.setEchartOption(this.props.chartData);
    }

    setEchartOption(chartData) {
        let title = '瞬时热量:' + this.props.chartData['瞬时热量'] + 'GJ 累计热量:'
          + this.props.chartData['累计热量'] + 'GJ';
        let option = {
            title: {
                text: title,
                bottom: 10,
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                formatter: "{a} <br/>{c} {b}"
            },
            toolbox: {
                show: false
            },
            series: [{
                type: 'gauge',
                center: ['20%', '50%'],
                radius: '48%',
                min: 50,
                max: 120,
                startAngle: 170,
                endAngle: 10,
                splitNumber: 7,
                axisLine: {
                    lineStyle: {
                        color: [
                            [0.2, '#3fa7dc'],
                            [0.8, '#fbe010'],
                            [1, '#fb5310'],
                        ],
                        width: 5
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '-120%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '-30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                data: [{
                    value: this.props.chartData['供水温度'],
                    name: '供水温度 ℃'
                }]
            }, {
                type: 'gauge',
                center: ['20%', '50%'],
                radius: '48%',
                min: 50,
                max: 120,
                startAngle: 350,
                endAngle: 190,
                splitNumber: 7,
                axisLine: {
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '120%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    },
                    formatter: "{value}℃",
                },
                data: [{
                    value: this.props.chartData['回水温度'],
                    name: '回水温度'
                }]
            }, {
                type: 'gauge',
                center: ['50%', '40%'],
                radius: '50%',
                min: 0,
                max: 1.2,
                startAngle: 152,
                endAngle: 37,
                splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '0%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '-30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                data: [{
                    value: this.props.chartData['供水压力'],
                    name: '供水压力 MPa'
                }]
            }, {
                type: 'gauge',
                center: ['50%', '60%'],
                radius: '50%',
                min: 0,
                max: 1.2,
                startAngle: 325,
                endAngle: 210,
                splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '0%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                data: [{
                    value: this.props.chartData['回水压力'],
                    name: '回水压力 MPa'
                }]
            }, {
                type: 'gauge',
                center: ['79%', '50%'],
                radius: '50%',
                min: 0,
                max: 120,
                startAngle: 170,
                endAngle: 10,
                splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '-120%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '-30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                data: [{
                    value: this.props.chartData['供水流量'],
                    name: '供水流量 T/h'
                }]
            }, {
                type: 'gauge',
                center: ['79%', '50%'],
                radius: '50%',
                min: 0,
                max: 120,
                startAngle: 350,
                endAngle: 190,
                splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 1
                },
                title: {
                    offsetCenter: [0, '120%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 14
                    }
                },
                detail: {
                    offsetCenter: [0, '30%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                data: [{
                    value: this.props.chartData['回水流量'],
                    name: '回水流量 T/h'
                }]
            }]
        };
        this.setState({
            option: option
        })
    }

    _onPressExpander(){
        this.setState({
            dir: this.state.dir === 'row' ? 'column' : 'row',
        });
    };

    render() {
        return (
          <TouchableOpacity onPress = {() => this._onPressExpander()}
            style = {[styles.buttonContents, {flexDirection: this.state.dir}]} >
            <Text>{this.props.chartData['热源名称']}-{this.props.chartData['更新状态']}-数据更新时间:{this.props.chartData['更新时间']}</Text>
            {
              this.state.dir === 'column' ?<Echarts option = {this.state.option} height = {280}/>:<Text/>
            }
          </TouchableOpacity>
        );
    }
}

export default class SourceParamRealtime extends Component {

   constructor(props) {
       super(props);
       var ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
       });
       this.state = {
           ds,
       };
   }

   componentWillMount() {
       let params = []
       let url = "URL";
       fetch(url)
           .then((response) => response.json())
           .then((responseData) => {
               for (let i = 0; i < responseData.data.length; i++) {
                   params.push(responseData.data[i]);
               }
               this.setState({
                   ds: this.state.ds.cloneWithRows(params),
               });
           });
   }


  renderRow(rowData){
     return(
       <Expander chartData={rowData}/>
     );
  }

  render(){
    return(
      <ListView dataSource={this.state.ds} renderRow={this.renderRow} initialListSize={10} pageSize={4} scrollRenderAheadDistance={500}/>
    )
  }

}

const styles = StyleSheet.create({
    buttonContents: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 3,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 3,
        paddingVertical: 10,
    },
});
