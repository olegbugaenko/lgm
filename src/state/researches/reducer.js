import * as Actions from "./actions";
import { researches } from "../../database/researches";


const initialState = {
    list: {},
    isInitialized: false,
}

const researchReducer = (state = initialState, action) => {
    if(!action) return state;
    switch (action.type) {
        case Actions.INIT_RESEARCHES:
            const obj = {};
            researches.forEach(one => {
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
        case Actions.SET_RESEARCH_META:
            const newState = state.list;
            for(const researchId in action.payload) {
                if(researchId in state.list) {
                    newState[researchId] = {
                        ...state.list[researchId],
                        ...action.payload[researchId]
                    }
                }
            }
            return {
                ...state,
                list: {...newState}
            }
        case Actions.UPDATE_RESEARCH_LEVEL:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.researchId]: {
                        ...state.list[action.payload.researchId],
                        level: state.list[action.payload.researchId].level + action.payload.qty,
                        isCalculated: false,
                    }
                }
            }
        default:
            return state;
    }
}

export default researchReducer;
