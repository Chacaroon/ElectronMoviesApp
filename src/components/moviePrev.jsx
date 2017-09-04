import React, {Component} from 'react' //eslint-disable-line
import {Modal, Button} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

import AddAndEditForm from './addAndEditForm.jsx' //eslint-disable-line

import pencil from '../assets/img/pencil.svg'
import defaultImg from '../assets/img/default.jpg'

export default class moviePrev extends Component { //parent Body

    constructor(props) {
        super(props)

        this.state = {
            isShowModal: false
            , isEdit: false
            , info: {...this.props.info}
        }

        if (this.props.info.img === 'default') {
            this.state.info.img = defaultImg
        } else {
            this.state.info.img = `/img/${this.state.info.img}`
        }
    }

    /*
     * Modal handlers
     */

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

    startEdit() {
        this.setState({
            isEdit: true
        })
    }

    successEdit() {
        this.setState({
            isEdit: false
            , isShowModal: false
        })
    }

    cancelEdit() {
        this.setState({
            isEdit: false
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            info: {
                ...nextProps.info
                , img: nextProps.info.img === 'default' ? defaultImg : `/img/${nextProps.info.img}`
            }
        })
    }

    /*
     * Render
     */

    render() {

        let {title, description, rating, genre, year, img} = this.state.info
            , isEdit = this.state.isEdit

        return <div className="prev" onClick={::this.showModal}>

            <div
                className="img-prev"
                style={{backgroundImage: `url(${img})`}}/>
            <p>{title}</p>
            <p>{rating}</p>
            <Modal show={this.state.isShowModal} onHide={::this.closeModal}>
                <Modal.Header>
                    <strong>{title}</strong>
                    <img src={pencil} id="edit-btn" onClick={::this.startEdit}/>
                </Modal.Header>
                <Modal.Body>
                    {isEdit
                        ? <AddAndEditForm info={this.state.info} handler={this.props.handler}
                            success={::this.successEdit}/>
                        : <div className="prev-body">
                            <div
                                className="img"
                                style={{backgroundImage: `url(${img})`}}
                            />

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
                    }
                </Modal.Body>
                {isEdit
                    ? <Modal.Footer>
                        <Button bsStyle="success" type="submit" style={{float: 'left'}} form="addAndEditForm">
                            Изменить
                        </Button>
                        <Button
                            bsStyle="danger" type="button" style={{float: 'right'}} onClick={::this.cancelEdit}>
                            Отменить
                        </Button>
                    </Modal.Footer>
                    : ''
                }
            </Modal>
        </div>
    }

    static propTypes = {
        info: PropTypes.shape({
            title: PropTypes.string.isRequired
            , description: PropTypes.string
            , rating: PropTypes.number.isRequired
            , genre: PropTypes.string.isRequired
            , year: PropTypes.number.isRequired
            , date: PropTypes.string.isRequired
            , img: PropTypes.string.isRequired
        })
        , handler: PropTypes.func.isRequired
    }
}