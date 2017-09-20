import React, {Component} from 'react' //eslint-disable-line
import {Modal} from 'react-bootstrap' //eslint-disable-line

export default class FetchingModal extends Component {
    render() {
        return (<Modal show={this.props.fetching}>
            <Modal.Header>
                Загрузка...
            </Modal.Header>
            <Modal.Body>
                Ведётся отправка информации на сервер
            </Modal.Body>
            <Modal.Footer/>
        </Modal>)
    }
}