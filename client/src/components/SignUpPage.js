import React, {useEffect, useState} from "react";
import ErrorMessage from "./other/ErrorMessage";
import {connect} from 'react-redux';
import {signup} from '../services/auth'
import {addNewErrorToSignUp} from "../actions/auth";
import {setTitle} from "../actions/appHead";
import LoadingSpinner from "./other/LoadingSpinner";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const SignUpPage = (props) => {

    const classes = useStyles();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [city, setCity] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('2020-01-01')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    useEffect(() => {
        props.dispatch(setTitle('SignUp'))
    }, [])
    const handleChangeFirstName = (e) => {
        const {target: {value}} = e
        setFirstName(value)
    }
    const handleChangeLastName = (e) => {
        const {target: {value}} = e
        setLastName(value)
    }
    const handleChangeUserName = (e) => {
        const {target: {value}} = e
        setUserName(value)
    }
    const handleChangeCity = (e) => {
        const {target: {value}} = e
        setCity(value)
    }
    const handleChangeEmail = (e) => {
        const {target: {value}} = e
        setEmail(value)
    }

    const handleChangePassword = (e) => {
        const {target: {value}} = e
        setPassword(value)
    }

    const handleChangePasswordConfirmation = (e) => {
        const {target: {value}} = e
        setPasswordConfirmation(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordConfirmation !== password) {
            props.dispatch(addNewErrorToSignUp('passwordConfirmation', 'Password & Confirm Password does not match'))
            return
        }
        const date = {
            firstName,
            lastName,
            userName,
            city,
            email,
            dateOfBirth,
            password
        }
        props.signup(date, props)
    }
    return (<div className="container-center page-container">

        <div className="form-container">
            <Link to="/signin"> <div className="signup-header">
                <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                <b>Back</b>
            </div></Link>
            <h1 className="title">Sign Up</h1>
            <div className="inputs-container">
                <div>
                    <input className="custom-input" type="text" placeholder="First Name" value={firstName}
                           onChange={handleChangeFirstName}/>
                    {props.errors.firstName && <ErrorMessage message={props.errors.firstName}/>}
                </div>
                <div>
                    <input className="custom-input" type="text" placeholder="Last Name" value={lastName}
                           onChange={handleChangeLastName}/>
                    {props.errors.lastName && <ErrorMessage message={props.errors.lastName}/>}
                </div>
                <div>
                    <input className="custom-input" type="text" placeholder="User Name" value={userName}
                           onChange={handleChangeUserName}/>
                    {props.errors.userName && <ErrorMessage message={props.errors.userName}/>}
                </div>
                <div>
                    <input className="custom-input" type="email" placeholder="Email" value={email}
                           onChange={handleChangeEmail}/>
                    {props.errors.email && <ErrorMessage message={props.errors.email}/>}
                </div>
                <div>
                    <input className="custom-input" type="text" placeholder="City" value={city}
                           onChange={handleChangeCity}/>
                    {props.errors.city && <ErrorMessage message={props.errors.city}/>}
                </div>
                <div>
                    <div className={classes.container} >
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            value={dateOfBirth}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e)=>{
                                setDateOfBirth(e.target.value)
                            }}
                        />
                    </div>
                    {props.errors.dateOfBirth && <ErrorMessage message={props.errors.dateOfBirth}/>}
                </div>
                <div>
                    <input className="custom-input" type="password" placeholder="Password" value={password}
                           onChange={handleChangePassword}/>
                    {props.errors.password && <ErrorMessage message={props.errors.password}/>}
                </div>
                <div>
                    <input className="custom-input" type="password" placeholder="Password Confirmation"
                           value={passwordConfirmation} onChange={handleChangePasswordConfirmation}/>
                    {props.errors && props.errors.passwordConfirmation &&
                    <ErrorMessage message={props.errors.passwordConfirmation}/>}
                </div>
                <div>
                    <button className="submit-btn" onClick={handleSubmit} disabled={props.isLoadingSignup}>SIGN UP
                    </button>
                </div>
            </div>
        </div>
        {props.isLoadingSignup && <LoadingSpinner isLoading={props.isLoadingSignup}/>}
    </div>)
}
const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.signupErrors,
        isLoadingSignup: state.authReducer.isLoadingSignup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: signup(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpPage));
