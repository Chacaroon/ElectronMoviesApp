import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

export default class moviePrev extends Component { //parent Body
    render() {

        const {title, description, rating} = this.props

        return <div className="prev">
            <p>{title}</p>
            <p>{description}</p>
            <p>{rating}</p>
        </div>
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
    }
}