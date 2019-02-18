import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import './TransactionTable.css';
import NewTrxForm from './NewTrxForm'
import {getUsers} from '../../utils/bill-splitter-api'
import {getTransactions} from '../../utils/bill-splitter-api'

class TransactionTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            usersLoaded: false,
            users: [],
            trxsLoaded: false,
            transactions: []
        }
    }

    componentDidMount(){
        getUsers(this.props.sessionId)
        .then((result) => {
            const simpleUsers = result.users.map(user => ({
                id: user.userId,
                name: `${user.firstName} ${user.lastName}`
            }));
            this.setState({
                usersLoaded: true,
                users: simpleUsers
            });
        },
        (error) => {
            this.setState({
                usersLoaded: true,
                error
              });
        })

        getTransactions(this.props.sessionId)
        .then((result) => {
            this.setState({
                trxsLoaded: true,
                transactions: result.transactions
            });
        },
        (error) => {
            this.setState({
                trxsLoaded: true,
                error
              });
        });
    }

    transformTransactions(trxs, users) {
        const userIds = users.map(user => user.id)
        const trxRows = trxs.map(trx => ({
            id: trx.transactiondId,
            description: trx.description,
            date: trx.dateSubmitted,
            paid: trx.userPaid.firstName,
            amount: trx.amount,
        }));
        for (var i = 0; i < trxs.length; i++) {
            const usersIncluded = trxs[i].usersIncluded.map(user => user.userId);
            trxRows[i]["usersIncluded"] = {};
            for (var j = 0; j < userIds.length; j++) {
                const id = userIds[j];
                if (usersIncluded.includes(id)) {
                    trxRows[i]["usersIncluded"][id] = "X";
                } else {
                    trxRows[i]["usersIncluded"][id] = "";
                }
            }
        }
        return trxRows;
    }

    formatColumns(users) {
        const columns = [{
            Header: 'Description',
            accessor: 'description'
        }, {
            Header: 'Date',
            accessor: 'date',
        }, {
            Header: 'Amount',
            accessor: 'amount',
        }, {
            Header: 'Who Paid?',
            accessor: 'paid',
        }];
        for (var i = 0; i < users.length; i++) {
            const id = users[i].id;
            columns.push({
                id: id,
                Header: users[i].name,
                accessor: d => d.usersIncluded[id]
            });
        }
        return columns;
    }

    render() {
        const { error, usersLoaded, users, trxsLoaded, transactions } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!usersLoaded || !trxsLoaded) {
            return <div>Loading...</div>;
        } else {
            const columns = this.formatColumns(users);
            const data = this.transformTransactions(transactions, users);
            return (
                <div className='transactionTable'>
                    <NewTrxForm 
                        users={users}
                    />
                    <ReactTable
                        data={data}
                        columns={columns}
                        minRows={columns.length}
                    />
                </div>
            );
        }
    }
}

export default TransactionTable;
