import React, { Component } from 'react';

export default class Condition extends Component {
  render() {
    const condition = this.props.condition;
    const soldQuantity = this.props.soldQuantity;

    if (soldQuantity < 0) {
      return null;
    }

    return (
      <span>{condition === 'new' ? 'Nuevo' : 'Usado'} - {soldQuantity} vendido{soldQuantity > 1 ? 's' : ''}</span>
    );
  }
}