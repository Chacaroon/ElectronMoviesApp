/*eslint-disable*/
import React, {Component} from "react";
/*eslint-enable*/

export default class AddMovie extends Component {

    inputsHandle(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    submitForm(e) {
        const {title, description, rating, genre, year} = this.state
        this.props.addMovie(title, description, +rating, genre, +year) // typeof rating === 'string'
        e.preventDefault()
    }

    render() {
        return <div>
            <form onSubmit={::this.submitForm}>
                <input type="text" name="title" onChange={::this.inputsHandle} required/>
                <br/>
                <input type="text" name="description" onChange={::this.inputsHandle} required/>
                <br/>
                <input type="number" name="rating" max="10" min="1" onChange={::this.inputsHandle} required/>
                <br/>
                <input type="text" name="genre" onChange={::this.inputsHandle} required/>
                <br/>
                <input type="number" name="year" onChange={::this.inputsHandle} required/>
                <button type="submit">
                    test
                </button>
            </form>
        </div>
    }
}
