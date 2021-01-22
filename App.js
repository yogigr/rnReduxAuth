import React, { Component } from 'react';
import Container from './src/Container';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
