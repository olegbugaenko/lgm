import {
    combineReducers
} from 'redux';

import resourcesReducer from './resources/reducer';
import navigationReducer from './navigation/reducer';
import buildingsReducer from "./buildings/reducer";
import researchReducer from "./researches/reducer";
import achievementReducer from "./achievements/reducer";
import expeditionsReducer from "./expedition/reducer";
import warReducer from "./war/reducer";

const appReducer = combineReducers({
    resources: resourcesReducer,
    navigation: navigationReducer,
    buildings: buildingsReducer,
    researches: researchReducer,
    achievements: achievementReducer,
    expedition: expeditionsReducer,
    war: warReducer,
})

export default appReducer;
