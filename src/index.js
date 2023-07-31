import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * PersistGate - This delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux.
 */
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
reportWebVitals();
