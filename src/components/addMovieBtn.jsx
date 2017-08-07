import React, {Component} from 'react' //eslint-disable-line
import {Modal, Button} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

export default class addMovieBtn extends Component { //parent Body

    constructor(props) {
        super(props)

        this.state = {
            image: '/img/default.jpg'
        }
    }

    // Inputs handler
    inputsHandler(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    // End inputs handler

    // Upload image handler
    imageHandler(event) {
        let reader = new FileReader()
        let img = event.target.files[0]

        reader.onload = (event) => {
            ::this.setState({
                image: event.target.result
            })
        }

        reader.readAsDataURL(event.target.files[0])
        this.setState({
            img: img
        })
    }

    // End upload image handler

    // Modal handlers
    componentWillMount() {
        this.setState({
            showModal: false
        })
    }

    showAddModal() {
        this.setState({
            showModal: true
        })
    }

    closeAddModal() {
        this.setState({
            image: '/img/default.jpg',
            showModal: false
        })
    }

    // End modal handlers

    // Send data
    submitForm(event) {
        event.preventDefault()

        this.props.addMovie(new FormData(event.target))
        this.setState({
            showModal: false
            , image: '/img/default.jpg'
        })
    }

    // End send data

    render() {
        return (
            <Button
                id="add-btn"
                bsStyle="success"
                onClick={::this.showAddModal}>
                Добавить фильм
                <Modal show={this.state.showModal} onHide={::this.closeAddModal}>
                    <Modal.Header>
                        <strong>Добавить фильм</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            onSubmit={::this.submitForm}
                            id="addMovieForm"
                            encType="multipart/form-data">

                            {/*Don't edit!*/}
                            <div
                                className="img" style={{backgroundImage: `url(${this.state.image})`}}
                                onClick={event => event.target.nextSibling.click()}/>
                            <input name="img" type="file" style={{display: 'none'}} onChange={::this.imageHandler}/>
                            {/*Don't edit!*/}

                            <div className="info">
                                <div>
                                    <b>Название: </b>
                                    <input type="text" name="title" onChange={::this.inputsHandler} required/>
                                </div>
                                <br/>
                                <div>
                                    <b>Оценка: </b>
                                    <input
                                        type="number" name="rating" max="10" min="1" onChange={::this.inputsHandler}
                                        required/>
                                </div>
                                <br/>
                                <div>
                                    <b>Жанр: </b>
                                    <input type="text" name="genre" onChange={::this.inputsHandler} required/>
                                </div>
                                <br/>
                                <div>
                                    <b>Год: </b>
                                    <input type="number" name="year" min="1895" onChange={::this.inputsHandler}/>
                                </div>
                            </div>

                            <div className="description">
                                <b>Описание:</b>
                                <textarea
                                    type="text" name="description" rows="5"
                                    onChange={::this.inputsHandler}/>
                            </div>

                            <Button bsStyle="success" type="submit">
                                Отправить
                            </Button>
                            <Button
                                bsStyle="danger" type="button"
                                onClick={::this.closeAddModal}
                                style={{float: 'right'}}>
                                Закрыть
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Button>
        )
    }

    static propTypes = {
        addMovie: PropTypes.func.isRequired
    }
}