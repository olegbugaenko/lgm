import * as Actions from "./actions";
import { achievements } from "../../database/achievements";


const initialState = {
    list: {},
    isInitialized: false,
}

const achievementReducer = (state = initialState, action) => {
    if(!action) return state;
    switch (action.type) {
        case Actions.INIT_ACHIEVEMENTS:
            const obj = {};
            achievements.forEach(one => {
                //if(!(one.id in state.list)) {
                    obj[one.id] = {
                        ...one,
                        level: 0,
                        ...(one.id in state.list ? state.list[one.id] : {})
                    }
                //}
            });
            return {
                ...state,
                list: obj
            }
        case Actions.SET_ACHIEVEMENT_META:
            const newState = state.list;
            for(const achievementId in action.payload) {
                if(achievementId in state.list) {
                    newState[achievementId] = {
                        ...state.list[achievementId],
                        ...action.payload[achievementId]
                    }
                }
            }
            return {
                ...state,
                list: {...newState}
            }
        default:
            return state;
    }
}

export default achievementReducer;
