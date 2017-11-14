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
      <header className="navbar search-bar" role="navigation">
        <div className="action-container d-flex justify-content-center">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Mercado Libre" width="53" height="36" />
          </Link>
          <form onSubmit={this.handleSubmit} className="form-inline col-7">
            <div className="input-group col">
              <input 
                type="text" 
                className="form-control border-0"
                placeholder="Nunca dejes de buscar"
                onChange={this.handleChange}
                value={this.state.search}
              />
              <div className="input-group-btn">
                <button className="btn impose-image" type="submit">Buscar</button>
              </div>
            </div>
          </form>
        </div>
      </header>
    );
  }
}