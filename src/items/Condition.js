import React, { Component } from 'react';

export default class Condition extends Component {
  render() {
    const condition = this.props.condition;
    const soldQuantity = this.props.soldQuantity;

    return (
      <div className="condition-container">
        {soldQuantity > 0 &&
          <span>{condition === 'new' ? 'Nuevo' : 'Usado'} - {soldQuantity} vendido{soldQuantity > 1 ? 's' : ''}</span>
        }
      </div>
    );
  }
}