import React, { Component } from 'react'

import './sign-in.style.scss'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

export default class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({email: '', password: ''})
        }
        catch(err) {
            console.log(err);
        }

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
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} type="button" isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
