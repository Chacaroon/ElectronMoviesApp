/*eslint-disable */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App.jsx'
import configureStore from './store/configureStore'
/*eslint-enable */

const store = configureStore()

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)