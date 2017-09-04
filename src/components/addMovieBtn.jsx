import React, {Component} from 'react' //eslint-disable-line
import {Modal, Button} from 'react-bootstrap' //eslint-disable-line
import PropTypes from 'prop-types'

import AddAndEditForm from './addAndEditForm.jsx' //eslint-disable-line

import defaultImg from '../assets/img/default.jpg'

export default class addMovieBtn extends Component { //parent Body

    constructor(props) {
        super(props)

        this.state = {
            image: defaultImg,
            showModal: false
        }
    }

    // Modal handlers
    showAddModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            image: defaultImg
            , showModal: false
        })
    }

    // End modal handlers

    render() {
        return (
            <Button
                id="add-btn"
                bsStyle="success"
                onClick={::this.showAddModal}>
                Добавить фильм
                <Modal show={this.state.showModal} onHide={::this.closeModal}>
                    <Modal.Header>
                        <strong>Добавить фильм</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <AddAndEditForm handler={this.props.handler} success={::this.closeModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" type="submit" style={{float: 'left'}} form="addAndEditForm">
                            Отправить
                        </Button>
                        <Button
                            bsStyle="danger" type="button" onClick={::this.closeModal} style={{float: 'right'}}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Button>
        )
    }

    static propTypes = {
        handler: PropTypes.func.isRequired
    }
}