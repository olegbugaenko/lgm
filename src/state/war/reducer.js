import * as Actions from './actions';

const initialState = {
    warriors: {
        amount: 0,
        attack: 3,
        hpRemaining: 0,
        hp: 10,
    },
    enemy: {
        amount: 0,
        attack: 2,
        hpRemaining: 0,
        hp: 8,
    },
    level: 0,
    stack: 0,
    isBattleInProgress: false,
}

const warReducer = (state = initialState, action) => {
    if (!action) return state;
    switch (action.type) {
        /*case Actions.START_BATTLE:
            return {
                ...state,
                isBattleInProgress: true,
            }*/
        case Actions.STOP_BATTLE:
            return {
                ...state,
                isBattleInProgress: false,
            }
        case Actions.SET_BATTLE_STATS:
            return {
                ...state,
                ...action.payload,
                warriors: {
                    ...state.warriors,
                    ...action.payload.warriors,
                },
                enemy: {
                    ...state.enemy,
                    ...action.payload.enemy,
                },
            }
        default:
            return state;
    }
}

export default warReducer;
