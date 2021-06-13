import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './state'

import App from './components/App'

const rootElement = document.getElementById('root');
console.log('root', rootElement);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    rootElement
)
