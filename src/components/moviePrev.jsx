import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

export default class moviePrev extends Component { //parent Body
    render() {

        const {title, rating, year} = this.props.info

        return <div className="prev">
            <p>{title}</p>
            <p>{rating}</p>
            <p>{year}</p>
        </div>
    }

    static propTypes = {
        info: PropTypes.shape({
            title: PropTypes.string.isRequired
            , description: PropTypes.string.isRequired
            , rating: PropTypes.number.isRequired
            , genre: PropTypes.string.isRequired
            , year: PropTypes.number.isRequired
            , date: PropTypes.string.isRequired
        })
    }
}