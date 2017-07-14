/*eslint-disable */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App.jsx'
import configureStore from './store/configureStore'
import './assets/scss/index.scss'
/*eslint-enable */

const store = configureStore()

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept(() => {
        render(App)
    })
}