import {
    ADD_MOVIE_FAILED,
    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,

    GET_MOVIE_REQUEST,
    GET_MOVIE_SUCCESS,
    GET_MOVIE_FAILED
} from '../constants/Body'
import $ from 'jquery'

export function addMovie(data) {
    return (dispatch) => {

        dispatch({
            type: ADD_MOVIE_REQUEST
        })

        const fail = () => {
            dispatch({
                type: ADD_MOVIE_FAILED,
                err: true,
                payload: new Error('Не удалось загрузить фильм :\'(')
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
                        payload: data.film
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
        })

        const fail = () => {
            dispatch({
                type: GET_MOVIE_FAILED,
                err: true,
                payload: new Error('Не удалось загрузить список фильмов :\'(')
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
                        payload: data.filmsList
                    })
                    : fail()
            })
            .fail(fail)
    }
}