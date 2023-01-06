import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import rootReducer from './services/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider 
            store={createStoreWithMiddleware(
                rootReducer,
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
            )}
        >
            <App />
        </Provider>
    </React.StrictMode>
);
