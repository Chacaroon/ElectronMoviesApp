import React, {Component} from 'react' //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import FilterList from '../components/filtersList.jsx' //eslint-disable-line

export default class Filter extends Component {

    render() {

        const {year, genre} = this.props.filters

        return <div>
            <div>
                Фильтры
                <FilterList
                    title='Год'
                    fieldName="year"
                    filter={year}
                    sortFilms={this.props.sortFilms}
                />

                <FilterList
                    title='Жанр'
                    fieldName="genre"
                    filter={genre}
                    sortFilms={this.props.sortFilms}
                />
            </div>
            <div>
                Сортировка
                <p>
                    <button>Дата добавления</button>
                </p>
            </div>
        </div>
    }

    static propTypes = {
        filters: PropTypes.shape({
            year: PropTypes.array
            , genre: PropTypes.array
        })
    }
}