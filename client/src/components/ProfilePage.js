import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from '../services/authHeader'
import {connect} from 'react-redux';
import {logout} from "../actions/auth";
import '../styles/profile.scss'
const ProfilePage = (props) => {
    const [userName, setUserName] = useState('')
    const [loginDates, setLoginDates] = useState([])
    useEffect(()=>{
        axios({
            headers: authHeader(),
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_URL}/users`,
        }).then((response) => {
            console.log(response.data)
            setUserName(response.data.userName)
            setLoginDates(response.data.lastLoginDate)
        }).catch((error) => {
            console.log(error)
            if(error.response && error.response.status === 401) {
                localStorage.removeItem('user')
                props.dispatch(logout())
            }
            // if (error.response.data && error.response.data.errors) {
            //     dispatch(signupError(error.response.data.errors));
            // } else {
            //     dispatch(signupError({errors: {message: 'network error'}}));
            // }
        })
    },[])
    return (<div className="page-container container-center">
        <div className="info">
            <h3><b>User Name : </b>{userName}</h3>
            {
                loginDates.map((date)=>{
                    return (<p>Last Login Time: {date}</p>)
                })
            }
        </div>
    </div>)
}

export default connect()(ProfilePage)
