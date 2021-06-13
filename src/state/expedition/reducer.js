import * as Actions from "./actions";

const initialState = {
    level: 0,
    progress: 0,
    maxProgress: 100,
    subLevelsProgress: 0,
    maxSubLevels: 100,
    maxLevel: 0,
    territoryGain: 0,
}

const expeditionsReducer = (state = initialState, action) => {
    if (!action) return state;
    switch (action.type) {
        case Actions.SET_LEVEL: {
            return {
                ...state,
                level: action.payload.level,
                progress: 0,
                maxProgress: 100*Math.pow(2, action.payload.level),
                subLevelsProgress: 0,
                maxSubLevels: 100,
            }
        }
        case Actions.UPDATE_PROGRESS_PER_TICK:
            if(action.payload === state.progressPerTick) return state;
            return {
                ...state,
                progressPerTick: action.payload,
            }
        case Actions.UPDATE_VALUES: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

export default expeditionsReducer;
