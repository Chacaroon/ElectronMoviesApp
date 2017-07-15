import React, {Component} from 'react' //eslint-disable-line no-unused-vars
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as bodyActions from '../actions/bodyActions'

import {Grid, Row, Col} from 'react-bootstrap' //eslint-disable-line no-unused-vars
import Body from './Body.jsx' //eslint-disable-line no-unused-vars
import Filter from './Filter.jsx' //eslint-disable-line no-unused-vars

class App extends Component {
    render() {
        const {filmsList} = this.props.body
        const {addMovie, findFilms}  = this.props.bodyActions
        return (
            <Grid>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <Body
                            addMovie={addMovie}
                            findFilms={findFilms}
                            filmsList={filmsList}/>
                    </Col>

                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Filter/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

App.propTypes = {
    body: PropTypes.shape({
        filmsList: PropTypes.array.isRequired
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