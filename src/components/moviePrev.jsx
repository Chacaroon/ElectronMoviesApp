import React, {Component} from 'react' //eslint-disable-line
import {Modal, Button} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

import pencil from '../assets/img/pencil.svg'
import defaultImg from '../assets/img/default.jpg'

export default class moviePrev extends Component { //parent Body

    constructor(props) {
        super(props)

        this.setState({
            isShowModal: false
        })
    }

    showModal() {
        this.setState({
            isShowModal: true,
        })
    }

    closeModal() {
        this.setState({
            isShowModal: false
        })
    }

    render() {

        let {title, description, rating, genre, year, img} = this.props.info

        if (img === 'default') {
            img = defaultImg
        } else {
            img = `/img/${img}`
        }

        return <div className="prev" onClick={::this.showModal}>

            <div
                className="img-prev"
                style={{backgroundImage: `url(${img})`}}/>
            <p>{title}</p>
            <p>{rating}</p>
            <Modal show={this.state.isShowModal} onHide={::this.closeModal}>
                <Modal.Header>
                    <strong>{title}</strong>
                    <img src={pencil} id="edit-btn"/>
                </Modal.Header>
                <Modal.Body>
                    <div className="prev-body">
                        <div
                            className="img"
                            style={{backgroundImage: `url(${img})`}}/>
                        <div className="info">
                            <p>Название: {title}</p>
                            <p>Жанр: {genre}</p>
                            <p>Год: {year ? year : ''}</p>
                            <p>Оценка: {rating}</p>
                        </div>
                        <div className="description">
                            <p>Описание:</p>
                            <p>{description}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" type="submit" style={{float: 'left'}}>
                        Отправить
                    </Button>
                    <Button
                        bsStyle="danger" type="button" style={{float: 'right'}}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }

    static propTypes = {
        info: PropTypes.shape({
            title: PropTypes.string.isRequired
            , description: PropTypes.string
            , rating: PropTypes.number.isRequired
            , genre: PropTypes.string.isRequired
            , year: PropTypes.number
            , date: PropTypes.string.isRequired
            , img: PropTypes.string.isRequired
        })
    }
}