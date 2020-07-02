import React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";

const AppHead = (props) => {
    return (
        <div>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        title: state.appHeadReducer.title
    }
}


export default connect(mapStateToProps)(AppHead)
