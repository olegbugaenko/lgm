import React from 'react';
import {connect} from 'react-redux';

const snackMessages = ({ notifications }) => (
    <div className={"notifications-container"}>
        {notifications && notifications.map(one => (<div className={'message'}>{one.message}</div>))}
    </div>
)

const SnackBars = connect((state) => ({
    notifications: state.app.navigation.notifications,
}))(snackMessages)

export default SnackBars;
