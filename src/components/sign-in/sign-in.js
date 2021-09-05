import React, { Component } from 'react'
import { connect } from 'react-redux'

import './sign-in.style.scss'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        
        emailSignInStart(email, password);
    }

    handleChange = e => {
        const { value, name } = e.target;

        this.setState({[name]: value});
    }

    render() {
        const { googleSignInStart } = this.props
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
                        <CustomButton 
                            onClick={googleSignInStart} 
                            type="button" 
                            isGoogleSignIn>
                                Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispathToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispathToProps)(SignIn);