import React from 'react';
import './component.css';

export default class Hello extends React.Component {
  render() {
    return (
    <div style={style}>
      <h1>Hello World</h1>
    </div>
    );
  }
}
var style = {
  backgroundColor: 'gray'
};
