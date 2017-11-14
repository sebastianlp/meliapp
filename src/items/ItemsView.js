import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Price from './Price';
import Api from '../api';
import FreeShipping from './FreeShipping.png';
import './ItemsView.css';

export default class ItemsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.location.search
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      query: newProps.location.search
    });

    this.search();
  }

  search() {
    Api.searchItems(this.state.query).then(res => {
      this.setState({
        items: res.items,
        categories: res.categories
      });
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <section className="list-container">
        {this.state.categories &&
          <div className="breadcrumb-container">
            <Breadcrumb levels={this.state.categories} />
          </div>
        }
        {this.state.items &&
          <div className="item-list-container">
            {this.state.items.map(item => {
              return (
                <div className="row" key={item.id}>
                  <div className="item-img-container">
                    <img src={item.picture} alt={item.title} />
                  </div>
                  <div className="col">
                    <div className="item-price-container">
                      <Price price={item.price.amount} currency={item.price.currency} />
                      {item.free_shipping &&
                        <span className="item-free-shipping-container">
                          <img src={FreeShipping} alt="Envío gratis" />
                        </span>
                      }
                    </div>
                    <div className="item-title-container">
                        <Link to={`/items/${item.id}`}>
                          <span className="item-title">
                            {item.title}
                          </span>
                        </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </section>
    );
  }
}