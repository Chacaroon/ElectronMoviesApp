import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

export default class FiltersList extends Component {

    sortHandler(event) {
        const {name, value} = event.target
        this.props.sortFilms({field: name, val: value})
    }

    render() {

        const {title, filter, fieldName} = this.props

        const filtersList = filter.map((item) => {
            return <p>
                <button name={fieldName} value={item} onClick={::this.sortHandler}>
                    {item}
                </button>
            </p>
        })

        return <div>
            <p>{title}</p>

            {filtersList}
        </div>
    }

    static propTypes = {
        title: PropTypes.string.isRequired
        , filter: PropTypes.array.isRequired
        , fieldName: PropTypes.string.isRequired
        , sortFilms: PropTypes.func.isRequired
    }
}
