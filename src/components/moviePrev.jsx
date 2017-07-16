import React, {Component} from 'react' //eslint-disable-line
import {Modal} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

export default class moviePrev extends Component { //parent Body

    componentWillMount() {
        this.setState({
            isShowModal: false
        })
    }

    showModal() {
        this.setState({
            isShowModal: true
        })
    }

    closeModal() {
        this.setState({
            isShowModal: false
        })
    }

    render() {

        const {title, description, rating, genre, year} = this.props.info

        return <div className="prev" onClick={::this.showModal}>
            <p>Название: {title}</p>
            <p>Оценка: {rating}</p>
            <p>Год: {year}</p>
            <Modal show={this.state.isShowModal} onHide={::this.closeModal}>
                <Modal.Header>
                    <strong>{title}</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="prev-elem">
                        <div className="img">

                        </div>
                        <div className="info">
                            <p>Название: {title}</p>
                            <p>Жанр: {genre}</p>
                            <p>Год: {year}</p>
                            <p>Оценка: {rating}</p>
                        </div>
                        <div className="description">
                            <p>Описание:</p>
                            <p>{description}</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
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