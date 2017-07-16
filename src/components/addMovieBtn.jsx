import React, {Component} from 'react' //eslint-disable-line
import {Modal} from 'react-bootstrap' //eslint-disable-line
import AddMovieForm from './addMovieForm.jsx' //eslint-disable-line
import PropTypes from 'prop-types'

export default class addMovieBtn extends Component { //parent Body

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
                className="prev"
                onClick={::this.showAddModal}>
                <Modal show={this.state.showModal} onHide={::this.closeAddModal}>
                    <Modal.Header>
                        <strong>Добавить фильм</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <AddMovieForm
                            addMovie={::this.props.addMovie}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    static propTypes = {
        addMovie: PropTypes.func.isRequired
    }
}