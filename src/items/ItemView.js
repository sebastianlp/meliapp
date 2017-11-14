import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';
import Price from './Price';
import Condition from './Condition';
import Api from '../api';
import './ItemView.css';

export default class ItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: props.match.params.id
    };

    this.search = this.search.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.search();
  }

  search() {
    Api.searchItem(this.state.itemId).then(res => {
      this.setState({
        item: res.item,
        categories: res.categories
      });
    }).catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Modulo de compra no desarrollado :P');
    alert('Buh!');
  }

  render() {
    return (
      <div className="item-container">
        {this.state.categories &&
          <div className="breadcrumb-container">
            <Breadcrumb levels={this.state.categories} />
          </div>
        }
        {this.state.item &&
          <div className="item-information-container">
            <div className="row">
              <div className="col-9">
                <img src={this.state.item.picture} alt={this.state.item.title} />
              </div>
              <div className="col-3">
                <div className="condition-container">
                  <Condition condition={this.state.item.condition} soldQuantity={this.state.item.sold_quantity} />
                </div>
                <div className="title-container">
                  <span className="title">{this.state.item.title}</span>
                </div>
                <div className="price-container">
                  <Price price={this.state.item.price.amount} currency={this.state.item.price.currency} />
                </div>
                <div className="buy-form-container">
                  <form onSubmit={this.handleSubmit}>
                    <button className="buy-button btn btn-lg" type="submit">Comprar</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="title-description-container">
                  <span>Descripción del producto</span>
                </div>
                <div className="description-container" dangerouslySetInnerHTML={{ __html: this.state.item.description }}></div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}