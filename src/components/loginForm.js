import React from 'react';
import Input from "./common/input";
import Joi from 'joi-browser';
import Form from "./common/form";

class LoginForm extends Form {
    state = {
        data: {username: '',password: ''},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit = ()=> {
        // Call the server
        console.log('submitted');
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data };
        data[input.name] = input.value;
        this.setState({data, errors});
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default LoginForm;
