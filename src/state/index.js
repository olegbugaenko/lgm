import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import MainSaga from './saga';
import appReducer from './reducer';
import BuildingSaga from "./buildings/saga";
import ResearchSaga from "./researches/saga";
import ExpeditionSaga from "./expedition/saga";
import UISaga from './navigation/saga';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer,
} = createReduxHistoryContext({
    history: createBrowserHistory(),
});

console.log('appReducer', appReducer);

const mainReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
});

const makePestistConfig = ({ key, ...props }) => ({
    key,
    storage,
    ...props,
});

export const rootPersistConfig = makePestistConfig({
    key: 'app',
    whitelist: [
        'app'
    ],
});

const persistedReducer = persistReducer(rootPersistConfig, mainReducer);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(routerMiddleware, sagaMiddleware)),
);

sagaMiddleware.run(MainSaga.tick);
sagaMiddleware.run(BuildingSaga.watch);
sagaMiddleware.run(ResearchSaga.watch);
sagaMiddleware.run(ExpeditionSaga.watch);
sagaMiddleware.run(UISaga.handleNotifications);

const history = createReduxHistory(store);
const persistor = persistStore(store);

export {
    store,
    history,
    persistor,
}
