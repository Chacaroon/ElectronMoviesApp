import React, {Component} from 'react'; //eslint-disable-line
import PropTypes from 'prop-types'

import MoviePrev from '../components/moviePrev.jsx' //eslint-disable-line
import AddMovieBtn from '../components/addMovieBtn.jsx' //eslint-disable-line

export default class Body extends Component {

    componentWillMount() {
        
    }

    render() {

        const content = this.props.filmsList.map((item, index) => {
            return <MoviePrev
                key={index}
                title={item.title}
                rating={item.rating}
                year={item.year}
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
        filmsList: PropTypes.array.isRequired,
        addMovie: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired
    }
}