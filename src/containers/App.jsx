import React, {Component} from 'react' //eslint-disable-line no-unused-vars
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as bodyActions from '../actions/bodyActions'

import Body from './Body.jsx' //eslint-disable-line no-unused-vars

class App extends Component {
    render() {
        const {filmsList, fetching, err} = this.props.body
        const {addMovie, editMovie, findFilms, sortFilms} = this.props.bodyActions
        return (
            <Body
                addMovie={addMovie}
                editMovie={editMovie}
                findFilms={findFilms}
                sortFilms={sortFilms}
                filmsList={filmsList}
                fetching={fetching}
                err={err}/>
        )
    }
}

App.propTypes = {
    body: PropTypes.shape({
        filmsList: PropTypes.array.isRequired
        , fetching: PropTypes.bool.isRequired
        , err: PropTypes.bool.isRequired
    })
}

function mapStateToProps(state) {
    return {
        body: state.body
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bodyActions: bindActionCreators(bodyActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)