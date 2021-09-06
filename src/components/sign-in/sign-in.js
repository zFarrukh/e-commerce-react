import React, { useState } from 'react'
import { connect } from 'react-redux'

import './sign-in.style.scss'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ( {googleSignInStart, emailSignInStart }) =>  {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = userCredentials;
        
        emailSignInStart(email, password);
    }

    const handleChange = e => {
        const { value, name } = e.target;

        setCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className="sign-in">
            <h2>I already have account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                name="email" 
                value={userCredentials.email} 
                handleChange={handleChange}
                label="Email"
                required />
                
                <FormInput 
                name="password" 
                label="Password"
                value={userCredentials.password} 
                type="password"
                handleChange={handleChange}
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

const mapDispathToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispathToProps)(SignIn);