export const SET_PAGE = 'SET_PAGE';
export const POST_NOTIFICATION = 'POST_NOTIFICATION';
export const REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';

export const navigate = (page) => ({
    type: SET_PAGE,
    payload: { page }
});

export const postNotification = ({message, ttl = 3000}) => ({
    type: POST_NOTIFICATION,
    payload: {
        message,
        ttl,
    }
})
