import React, { Component } from 'react';

import {getSessions} from '../utils/bill-splitter-api'
import './App.css';
import TransactionTable from './components/TransactionTable';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            sessions: []
        }
    }

    componentDidMount(){
        getSessions()
        .then((result) => {
            this.setState({
                isLoaded: true,
                sessions: result.sessions
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
              });
        })
    }

    render() {
        const { error, isLoaded, sessions } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="app">
                    <h2>{sessions[0].name}</h2>
                    <TransactionTable
                        sessionId={1}
                    />
                </div>
            );
        }
    }
}

export default App;
