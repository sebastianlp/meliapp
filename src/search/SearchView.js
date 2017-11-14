import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';
import './SearchView.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const search = event.target.value;

    this.setState({
      search
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let route = '/';

    if (this.state.search !== '') {
      const query = queryString.stringify({
        q: this.state.search
      });

      route = `/items?${query}`;
    }

    this.props.history.push(route);
  }

  render() {
    return (
      <header className="navbar search">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="Mercado Libre" className="brand-logo" />
              </Link>
            </div>
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Nunca dejes de buscar"
                    onChange={this.handleChange}
                    value={this.state.search}
                  />
                  <span className="input-group-btn">
                    <button type="submit" className="btn search-image-button">Buscar</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    );
  }
}