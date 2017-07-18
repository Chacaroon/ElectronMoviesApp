import React, {Component} from 'react' //eslint-disable-line
import {Modal} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

export default class addMovieBtn extends Component { //parent Body

    inputsHandle(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    submitForm(e) {
        const {title, description, rating, genre, year, img} = this.state
        this.props.addMovie(title, description, rating, genre, year, img)
        this.setState({
            showModal: false
        })
        e.preventDefault()
    }

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
            showModal: false
        })
    }

    render() {
        return (
            <div
                id="add-btn"
                onClick={::this.showAddModal}>
                <Modal show={this.state.showModal} onHide={::this.closeAddModal}>
                    <Modal.Header>
                        <strong>Добавить фильм</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={::this.submitForm} id="addMovieForm">
                            <p>
                                <label>
                                    Название: <input type="text" name="title" onChange={::this.inputsHandle} required/>
                                </label>
                            </p>
                            <p>
                                <label>
                                    Описание: <textarea type="text" name="description" rows="5" onChange={::this.inputsHandle} required/>
                                </label>
                            </p>
                            <p>
                                <label>Оценка:
                                    <input type="number" name="rating" max="10" min="1" onChange={::this.inputsHandle} required/>
                                </label>
                            </p>
                            <p>
                                <label>
                                    Жанр: <input type="text" name="genre" onChange={::this.inputsHandle} required/>
                                </label>
                            </p>
                            <p>
                                <label>
                                    Год: <input type="number" name="year" min="1970" onChange={::this.inputsHandle} required/>
                                </label>
                            </p>
                            <p>
                                <label>
                                    Изображенние: <input type="text" name="img" onChange={::this.inputsHandle} />
                                </label>
                            </p>
                            <button type="submit">
                                Отправить
                            </button>
                            <button type="button" onClick={::this.closeAddModal}>
                                Закрыть
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    static propTypes = {
        addMovie: PropTypes.func.isRequired
    }
}