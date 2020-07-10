import React, {useEffect, useState} from "react";
import '../styles/registration.scss'
import {Link} from 'react-router-dom';
import ErrorMessage from "./other/ErrorMessage";
import {signin} from "../services/auth";
import {connect} from "react-redux";
import {setTitle} from "../actions/appHead";
import LoadingSpinner from "./other/LoadingSpinner";

const SignInPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        props.dispatch(setTitle('Login'))
    }, [])
    const handleChangeEmail = (e) => {
        const {target: {value}} = e
        setEmail(value)
    }

    const handleChangePassword = (e) => {
        const {target: {value}} = e
        setPassword(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        props.signin(data)
    }
    return (<div className="container-center page-container">
        <div className="form-container">
            <h1 className="title">Login</h1>
            <div className="inputs-container">
                <div>
                    <input className="custom-input" type="email" placeholder="Email" value={email}
                           onChange={handleChangeEmail}/>
                </div>
                <div>
                    <input className="custom-input" type="password" placeholder="Password" value={password}
                           onChange={handleChangePassword}/>
                </div>
                <div>
                    {props.errors.error && <ErrorMessage message={props.errors.error}/>}
                    <button onClick={handleSubmit} className="submit-btn" disabled={props.isLoadingSignin}>LOGIN
                    </button>
                </div>
                <p>Or - <Link to="/signup">Create New Account</Link></p>
            </div>
        </div>
        {props.isLoadingSignin && <LoadingSpinner isLoading={props.isLoadingSignin}/>}
    </div>)
}
const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.signinErrors,
        isLoadingSignin: state.authReducer.isLoadingSignin,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: signin(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)
