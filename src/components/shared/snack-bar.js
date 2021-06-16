import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

const snackMessages = ({ notifications }) => (
    <div className={"notifications-container"}>
        {notifications && notifications.map(one => (<div className={classnames('message',one.type)}>{one.message}</div>))}
    </div>
)

const SnackBars = connect((state) => ({
    notifications: state.app.navigation.notifications,
}))(snackMessages)

export default SnackBars;
