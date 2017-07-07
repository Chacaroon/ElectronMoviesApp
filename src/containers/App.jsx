import React, {Component} from 'react' //eslint-disable-line no-unused-vars
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as bodyActions from '../actions/bodyActions'

import Body from '../components/Body.jsx' //eslint-disable-line no-unused-vars

class App extends Component {
    render() {
        const {movieList} = this.props.body
        const {addMovie} = this.props.bodyActions
        return <div>
            <Body addMovie={addMovie} movieList={movieList}/>
        </div>
    }
}

App.propTypes = {
    body: PropTypes.shape({
        movieList: PropTypes.array.isRequired
    }),
    crits: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        body: state.body,
        crits: state.crits
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bodyActions: bindActionCreators(bodyActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)