import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './Main/Main';
import Navbar from './Navbar/Navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Navbar />
            <Switch>
              <Route path="/" component={Main} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
