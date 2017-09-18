import React, {Component} from 'react'; //eslint-disable-line
import PropTypes from 'prop-types'

import MoviePrev from '../components/moviePrev.jsx' //eslint-disable-line
import AddMovieBtn from '../components/addMovieBtn.jsx' //eslint-disable-line
import {Grid, Row, Col} from 'react-bootstrap' //eslint-disable-line no-unused-vars
import Filter from './Filter.jsx' //eslint-disable-line no-unused-vars

export default class Body extends Component {

    componentWillMount() {
        this.props.findFilms()
    }

    render() {

        const {editMovie, filters, sortFilms, addMovie, filmsList} = this.props

        const content = filmsList.map((item) => {
            return <MoviePrev
                key={item.id}
                info={item}
                handler={editMovie}
            />
        })

        return <div id="body">
            <Grid>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <div id="header">
                            <AddMovieBtn
                                handler={addMovie}
                            />
                        </div>
                        {content}
                    </Col>

                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Filter
                            sortFilms={sortFilms}
                            filters={filters}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    }

    static propTypes = {
        filmsList: PropTypes.array.isRequired
        , addMovie: PropTypes.func.isRequired
        , editMovie: PropTypes.func.isRequired
        , fetching: PropTypes.bool.isRequired
        , findFilms: PropTypes.func.isRequired
        , sortFilms: PropTypes.func.isRequired
        , filters: PropTypes.shape({
            year: PropTypes.array
            , genre: PropTypes.array
        })
    }
}