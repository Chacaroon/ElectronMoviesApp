import React, {Component} from 'react' //eslint-disable-line no-unused-vars

export default class Filter extends Component {

    handler(event) {
        const {name, value} = event.target
        this.props.sortFilms({field: name, val: value})
    }

    render() {

        return <div>
            <button name="year" value="2017" style={{width: '90%', height: 30}} onClick={::this.handler}>
                Year
            </button>
        </div>
    }
}