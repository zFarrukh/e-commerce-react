import React, { Component } from 'react'

import './sign-in.style.scss'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

export default class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({email: '', password: ''})
    }

    handleChange = e => {
        const { value, name } = e.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="email" 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label="Email"
                    required />
                    
                    <FormInput 
                    name="password" 
                    label="Password"
                    value={this.state.password} 
                    type="password"
                    handleChange={this.handleChange}
                    required />

                    <CustomButton type="submit">Sign In</CustomButton>
                </form>
            </div>
        )
    }
}
