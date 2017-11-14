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
          <div className="item-info-container container">
            <div className="row text-center">
              <div className="col-sm-3 col-lg-8">
                <div className="item-img-container">
                  <img src={this.state.item.picture} alt={this.state.item.title} />
                </div>
              </div>
              <div className="col-sm-9 col-lg-4">
                <div className="item-condition-container">
                  <Condition condition={this.state.itemId.condition} soldQuantity={this.state.item.sold_quantity} />
                </div>
                <div className="item-title-container">
                  <span className="item-title">{this.state.item.title}</span>
                </div>
                <div className="item-price-container">
                  <Price price={this.state.item.price.amount} currency={this.state.item.price.currency} />
                </div>
                <div className="item-buy-form-container">
                  <form onSubmit={this.handleSubmit}>
                    <button className="btn btn-lg item-buy-button" type="submit">Comprar</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="item-description-title-container">
                  <span>Descripcion del producto</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="item-description-container">
                  <div dangerouslySetInnerHTML={{ __html: this.state.item.description }}></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}