import * as Actions from "./actions";
import { buildings } from "../../database/buildings";
import {SET_BUILDINGS_META} from "./actions";
import {UPDATE_BUILDING_LEVEL} from "./actions";

const initialState = {
    list: {},
    isInitialized: false,
}

const buildingsReducer = (state = initialState, action) => {
    if(!action) return state;
    switch (action.type) {
        case Actions.INIT_BUILDINGS:
            const obj = {};
            buildings.forEach(one => {
                //if(!(one.id in state.list)) {
                    obj[one.id] = {
                        ...one,
                        level: 0,
                        workers: 0,
                        resourcesToBuild: {},
                        productionPerWorker: 0,
                        productionTotal: {},
                        ...(one.id in state.list ? state.list[one.id] : {}),
                        sort: one.sort,
                        name: one.name,
                    }
                //}
            });
            return {
                ...state,
                list: obj
            }
        case Actions.SET_BUILDINGS_META:
            const newState = state.list;
            for(const buildingId in action.payload.buildings) {
                if(buildingId in state.list) {
                    newState[buildingId] = {
                        ...state.list[buildingId],
                        ...action.payload.buildings[buildingId]
                    }
                }
            }
            return {
                ...state,
                list: {...newState},
                territoryUsed: action.payload.territoryUsed,
                healthFactor: action.payload.healthFactor,
                happinessFactor: action.payload.happinessFactor,
            }
        case Actions.UPDATE_BUILDING_LEVEL:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.buildingId]: {
                        ...state.list[action.payload.buildingId],
                        level: state.list[action.payload.buildingId].level + action.payload.qty,
                        isCalculated: false,
                    }
                }
            }
        case Actions.SET_WORKERS:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.buildingId]: {
                        ...state.list[action.payload.buildingId],
                        workers: Math.min(state.list[action.payload.buildingId].maxWorkers, action.payload.workers),
                    }
                }
            }
        case Actions.SET_AUTOFILL_OPTIONS:
            console.log('act: ', action);
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.buildingId]: {
                        ...state.list[action.payload.buildingId],
                        autofill: action.payload.autofill,
                    }
                }
            }
        case Actions.SET_QTY:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.buildingId]: {
                        ...state.list[action.payload.buildingId],
                        qty: action.payload.qty,
                    }
                }
            }
        default:
            return state;
    }
}

export default buildingsReducer;
