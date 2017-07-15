import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

export default class moviePrev extends Component { //parent Body
    render() {

        const {title, rating, year} = this.props

        return <div className="prev">
            <p>{title}</p>
            <p>{rating}</p>
            <p>{year}</p>
        </div>
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired
    }
}