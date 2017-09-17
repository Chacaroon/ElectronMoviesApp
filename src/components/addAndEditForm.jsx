import React, {Component} from 'react' //eslint-disable-line
import PropTypes from 'prop-types'

import defaultImg from '../assets/img/default.jpg'

export default class AddAndEditForm extends Component {

    constructor(props) {
        super(props)

        if (props.info) {
            this.state = { // сработает, если выполняется изменение фильма
                ...props.info
                , image: props.info.img
            }
        } else {
            this.state = { // сработает, если добавлятся новый фильм
                id: 0 // заглушка. Новый id выдаст сервер
                , image: defaultImg
                , img: defaultImg
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

        const data = new FormData(event.target)
        if (!data.get('img').name) { // если у файла в поле img нет имени, значит файла нет
            data.set('img', this.state.img) // заменить значение в поле img на имя файла, полученное при монтировании
        }
        // data.append('img', this.props.info.img)

        this.props.handler(data, this.state.id)
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