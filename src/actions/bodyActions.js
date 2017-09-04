import {
    ADD_MOVIE_FAILED
    , ADD_MOVIE_REQUEST
    , ADD_MOVIE_SUCCESS

    , GET_MOVIE_REQUEST
    , GET_MOVIE_SUCCESS
    , GET_MOVIE_FAILED

    , EDIT_MOVIE_REQUEST
    , EDIT_MOVIE_SUCCESS
    , EDIT_MOVIE_FAILED
} from '../constants/Body'
import $ from 'jquery'

export function addMovie(data) {
    return (dispatch) => {

        dispatch({
            type: ADD_MOVIE_REQUEST
            , payload: {
                fetching: true
            }
        })

        const fail = () => {
            dispatch({
                type: ADD_MOVIE_FAILED,
                err: true,
                payload: {
                    err: new Error('Не удалось загрузить фильм :\'(')
                    , fetching: false
                }
            })
        }

        $.ajax('/addMovie', {
            method: 'POST',
            processData: false,
            contentType: false,
            data: data
        })
            .done((data) => {
                data.isSuccess
                    ? dispatch({
                        type: ADD_MOVIE_SUCCESS,
                        payload: {
                            data: data.film
                            , fetching: false
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}

export function editMovie(data, id) {

    return (dispatch) => {
        dispatch({
            type: EDIT_MOVIE_REQUEST
            , payload: {
                fetching: true
            }
        })

        const fail = () => {
            dispatch({
                type: EDIT_MOVIE_FAILED,
                err: true,
                payload: {
                    err: new Error('Не удалось отредактировать фильм :\'(')
                    , fetching: false
                }
            })
        }

        $.ajax(`/editMovie/${id}`, {
            method: 'POST',
            processData: false,
            contentType: false,
            data: data
        })
            .done((data) => {
                data.isSuccess
                    ? dispatch({
                        type: EDIT_MOVIE_SUCCESS,
                        payload: {
                            film: data.film
                            , fetching: false
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}

export function findFilms(request) {

    return (dispatch) => {
        dispatch({
            type: GET_MOVIE_REQUEST
            , payload: {fetching: true}
        })

        const fail = () => {
            dispatch({
                type: GET_MOVIE_FAILED,
                err: true,
                payload: {
                    err: new Error('Не удалось загрузить список фильмов :\'(')
                    , fetching: false
                }
            })
        }

        $.ajax('/findFilms', {
            type: 'POST',
            data: request
        })
            .done((data) => {

                data.isSuccess
                    ? dispatch({
                        type: GET_MOVIE_SUCCESS,
                        payload: {
                            data: data.filmsList
                            , fetching: false
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}