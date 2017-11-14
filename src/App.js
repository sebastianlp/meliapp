import React, { Component } from 'react';
import SearchView from './search/SearchView';
import ItemsView from './items/ItemsView';
import ItemView from './items/ItemView';
import { Switch, Route } from 'react-router-dom';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* Always show the SearchView */}
        <Route path="/" component={SearchView} />

        {/* I use Switch because I want to render exactly one route => component and not every match
        Use exact in items to "hack" the switch and allow to render /items/1 and not /items/ because he match it */}
        <div className="container">
          <div className="row">
            <div className="col">
              <Switch>
                <Route exact path="/items" component={ItemsView} />
                <Route path="/items/:id" component={ItemView} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}