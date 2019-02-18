import React, { Component } from 'react';

class NewTrxForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            paid: '',
            benefitted: props.users.map(user => user.id)
        }
    }

    handleChange = event => {
        const target = event.target;
        let value = target.value;
        const name = target.name;

        if (name === 'benefitted') {
            const options = target.options;
            console.log(options);
            value = []
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
        }
        console.log(value);
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        alert('A name was submitted: ' + this.state.benefit);
        event.preventDefault();
    };

    renderOptions(users) {
        var rows = [];
        for (var i = 0; i < users.length; i++) {
            rows.push(<option key={users[i].id} value={users[i].id}>{users[i].name}</option>);
        }
        return rows;
    }

    render() {
        return (
            <div className="New-trx">
                <form onSubmit={this.handleSubmit}>
                    <h2>Add new record</h2>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                        />
                    </label>
                    {"  "}
                    <label>
                        Amount:
                        <input
                            type="text"
                            name="amount"
                            onChange={this.handleChange}
                        />
                    </label>
                    {"   "}
                    <label>
                        Who paid:
                        <select name="paid" value={this.state.paid} onChange={this.handleChange}>
                            {this.renderOptions(this.props.users)}
                        </select>
                    </label>
                    {"   "}
                    <label>
                        Who benefitted:
                        <select multiple={true} name="benefitted" value={this.state.benefitted} onChange={this.handleChange}>
                            {this.renderOptions(this.props.users)}
                        </select>
                    </label>
                    {"   "}
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default NewTrxForm;
