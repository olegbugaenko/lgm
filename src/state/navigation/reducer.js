import * as Actions from "./actions";

const initialState = {
    page: "overview",
    notifications: [],
}

const navigationReducer = (state = initialState, action) => {
    if(!action) return state;
    switch (action.type) {
        case Actions.SET_PAGE:
            if(!action.payload.page) return state;
            return {
                ...state,
                page: action.payload.page,
            }
        case Actions.POST_NOTIFICATION:
            if(!action.payload.message) return state;
            const notif = [
                ...(state.notifications || []),
                {
                    message: action.payload.message,
                    expiresAt: (new Date()).getTime() + action.payload.ttl,
                    id: `${(new Date()).getTime()}-${Math.random()}`
                }
            ];
            if(notif.length > 3) {
                notif.shift();
            }
            return {
                ...state,
                notifications: [
                    ...notif,
                ]
            }
        case Actions.REMOVE_NOTIFICATIONS:
            return {
                ...state,
                notifications: (state.notifications || []).filter(one => !action.payload.ids.includes(one.id)),
            }
        default:
            return state;
    }
}

export default navigationReducer;
