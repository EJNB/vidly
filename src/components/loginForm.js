import React, {Component} from 'react';

class LoginForm extends Component {
    state = {
        account: {username: '',password: ''}
    };

    handleSubmit = e => {
        e.preventDefault();
        // Call the server
        console.log('submitted');
    };

    handleChange = ({currentTarget: input}) => {
        const account = {...this.state.account };
        account[input.name] = input.value;
        this.setState({account});
    };

    render() {
        const {account} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            autoFocus
                            type="text"
                            id="username"
                            name="username"
                            value={account.username}
                            onChange={this.handleChange}
                            className="form-control"
                            aria-describedby="emailHelp"
                        />
                            {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
                            {/*    else.</small>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={this.handleChange}
                            value={account.pasword}
                        />
                    </div>
                    {/*<div className="form-group form-check">*/}
                    {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1">*/}
                    {/*    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                    {/*</div>*/}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
