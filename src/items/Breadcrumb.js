import React, { Component } from 'react';
import './Breadcrumb.css';

export default class Breadcrumb extends Component {
  render() {
    return (
      <ol className="breadcrumb">
        {this.props.levels.map((level, index) => {
          return <li key={index} className="breadcrumb-item">{level}</li>
        })}
      </ol>
    );
  }
}