import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src/routes';
import store from './src/store';

export default function App () {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}
