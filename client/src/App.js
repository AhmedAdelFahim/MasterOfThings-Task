import React from 'react';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import AuthRoute from "./components/other/AuthRoute";
import ProfilePage from "./components/ProfilePage";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <AuthRoute path='/signin' type="guest">
                        <SignInPage/>
                    </AuthRoute>
                    <AuthRoute path='/signup' type="guest">
                        <SignUpPage/>
                    </AuthRoute>
                    <AuthRoute path='/profile' type="private">
                        <ProfilePage/>
                    </AuthRoute>
                    <AuthRoute path='/' type="guest">
                        <SignInPage/>
                    </AuthRoute>
                </Switch>
            </Router>
        </>

    );
}

export default App;
