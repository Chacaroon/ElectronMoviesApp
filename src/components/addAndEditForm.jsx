import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

import defaultImg from '../assets/img/default.jpg'

export default class AddAndEditForm extends Component {

    constructor(props) {
        super(props)

        if (this.props.info) {
            this.state = {
                ...this.props.info
                , image: this.props.info.img
            }
        } else {
            this.state = {
                id: 0
                , image: defaultImg
            }
        }
    }

    // Upload image handler
    imageHandler(event) {
        if (event.target.files[0]) {
            let reader = new FileReader()

            reader.onload = (event) => {
                ::this.setState({
                    image: event.target.result
                })
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    inputsHandler(event) {

        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    submitForm(event) {
        event.preventDefault()

        this.props.handler(new FormData(event.target), this.state.id)
        this.props.success()
        this.setState({
            image: defaultImg
        })
    }

    // End upload image handler

    render () {

        return <form encType="multipart/form-data" id="addAndEditForm" onSubmit={::this.submitForm}>

            {/*Don't edit!*/}
            <div className="img" style={{backgroundImage: `url(${this.state.image})`}}
                onClick={event => event.target.nextSibling.click()}
            />
            <input name="img" type="file" style={{display: 'none'}} onChange={::this.imageHandler}/>
            {/*Don't edit!*/}

            <div className="info">
                <div>
                    <b>Название: </b>
                    <input type="text" name="title" value={this.state.title} required onChange={::this.inputsHandler}/>
                </div>
                <br/>
                <div>
                    <b>Жанр: </b>
                    <input type="text" name="genre" value={this.state.genre} required onChange={::this.inputsHandler}/>
                </div>
                <br/>
                <div>
                    <b>Год: </b>
                    <input type="number" name="year" min="1895" value={this.state.year}
                        required onChange={::this.inputsHandler}/>
                </div>
                <br/>
                <div>
                    <b>Оценка: </b>
                    <input
                        type="number" name="rating" min="1" max="10"
                        value={this.state.rating} required onChange={::this.inputsHandler}/>
                </div>
            </div>

            <div className="description">
                <b>Описание:</b>
                <textarea type="text" name="description" value={this.state.description} rows="5"
                    onChange={::this.inputsHandler}/>
            </div>
        </form>
    }

    static PropTypes = {
        handler: PropTypes.func.isRequired
        , closeModal: PropTypes.func.isRequired
    }
}