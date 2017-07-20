import React, {Component} from 'react'; //eslint-disable-line
import PropTypes from 'prop-types'

import MoviePrev from '../components/moviePrev.jsx' //eslint-disable-line
import AddMovieBtn from '../components/addMovieBtn.jsx' //eslint-disable-line

export default class Body extends Component {

    componentWillMount() {
        this.props.findFilms()
    }

    render() {

        const content = this.props.filmsList.map((item) => {
            return <MoviePrev
                key={item._id}
                info={{...item}}
            />
        })

        return <div id="body">
            {content}
            <AddMovieBtn
                addMovie={this.props.addMovie}
                fetching={this.props.fetching}
            />
        </div>
    }

    static propTypes = {
        filmsList: PropTypes.array.isRequired,
        addMovie: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired,
        findFilms: PropTypes.func.isRequired
    }
}