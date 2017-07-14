import React, {Component} from 'react'; //eslint-disable-line
import PropTypes from 'prop-types'

import MoviePrev from '../components/moviePrev.jsx' //eslint-disable-line
import AddMovieBtn from '../components/addMovieBtn.jsx' //eslint-disable-line

export default class Body extends Component {

    render() {

        const content = this.props.movieList.map((item, index) => {
            return <MoviePrev
                key={index}
                title={item.title}
                description={item.description}
                rating={item.rating}
            />
        })

        content.push(<AddMovieBtn
            addMovie={this.props.addMovie}
            key={content.length}
        />)

        return <div id="body">
            {content}
        </div>
    }

    static propTypes = {
        movieList: PropTypes.array.isRequired,
        addMovie: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired
    }
}