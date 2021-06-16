import * as Actions from "./actions";

const initialState = {
    population: {
        name: 'Population',
        value: 10,
        max: 10,
        income: 0,
        freeLabour: 0,
    },
    food: {
        name: 'Food',
        value: 150,
        max: 1000,
        income: 0,
    },
    wood: {
        name: 'Wood',
        value: 100,
        max: 1000,
        income: 0,
    },
    stone: {
        name: 'Stone',
        value: 0,
        max: 1000,
        income: 0,
    },
    metal: {
        name: 'Metal',
        value: 0,
        max: 1000,
        income: 0,
    },
    science: {
        name: 'Science',
        value: 0,
        max: 1.e+4999,
        income: 0,
        isStocked: false,
    },
    building: {
        name: 'Building',
        value: 0,
        max: 1.e+4999,
        income: 0,
    }
}

const resourcesReducer = (state = initialState, action) => {
    if(!action) return state;
    switch (action.type) {
        case Actions.SET_RESOURCE:
            if(!action.payload.resource || !(action.payload.resource in state)) return state;
            return {
                ...state,
                [action.payload.resource]: {
                    ...state[action.payload.resource],
                    value: action.payload.value,
                }
            }
        case Actions.MODIFY_RESOURCE:
            if(!action.payload.resource || !(action.payload.resource in state)) return state;
            const rs = state[action.payload.resource];
            /*console.log('rrs', rs, {
                ...rs,
                value: Math.min(rs.value + action.payload.value, rs.max),
            },action.payload.value);*/
            return {
                ...state,
                [action.payload.resource]: {
                    ...rs,
                    value: Math.min(rs.value + action.payload.value, rs.max),
                }
            }
        case Actions.AUTOINCREMENT_ALL:
            const newState = {...state};
            for(let resource in newState) {
                if(resource === 'science') {
                    newState[resource].max = 1.e+9999;
                }
                newState[resource].value = Math.max(0, Math.min(
                    newState[resource].value + newState[resource].income,
                    newState[resource].max
                ));
            }
            return newState;
        case Actions.SET_RESOURCE_METRICS:
            if(!action.payload.resource || !(action.payload.resource in state)) return state;
            const res = state[action.payload.resource];
            let newData = {
                max: res.max,
                income: res.income,
                freeLabour: res.freeLabour
            }
            if('max' in action.payload) {
                newData.max = action.payload.max;
            }
            if('income' in action.payload) {
                newData.income = action.payload.income;
            }
            if('freeLabour' in action.payload) {
                newData.freeLabour = action.payload.freeLabour;
            }
            return {
                ...state,
                [action.payload.resource]: {
                    ...res,
                    ...newData,
                }
            }
        default:
            return state;
    }
}

export default resourcesReducer;
