import React, { Component } from 'react';

import {getTransactions} from '../utils/bill-splitter-api'
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          transactions: []
        }
    }

    componentDidMount(){
        getTransactions(1)
        .then(json => console.log(json))
    }

  render() {
    return (
      <div className="App"></div>
    );
  }
}

export default App;
