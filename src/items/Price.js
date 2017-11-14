import React, { Component } from 'react';

export default class Price extends Component {
  render() {
    return (
      <span className="item-price">
        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: this.props.currency, minimumFractionDigits: 0}).format(this.props.price)}
      </span>
    );
  }
}