import React, {Component} from 'react';

class LoginForm extends Component {
    username = React.createRef();

    // componentDidMount() {
    //     this.username.current.focus();
    // }

    handleSubmit = e => {
        e.preventDefault();
        // Call the server
        console.log('submitted');
    };

    render() {
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
                            ref={this.username}
                            className="form-control"
                            aria-describedby="emailHelp"
                        />
                            {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
                            {/*    else.</small>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password"/>
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
