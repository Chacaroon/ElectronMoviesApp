import {
    ADD_MOVIE_FAILED
    , ADD_MOVIE_REQUEST
    , ADD_MOVIE_SUCCESS

    , GET_MOVIE_SUCCESS
    , GET_MOVIE_FAILED

    , EDIT_MOVIE_REQUEST
    , EDIT_MOVIE_SUCCESS
    , EDIT_MOVIE_FAILED

    , SORT_MOVIE_REQUEST
    , SORT_MOVIE_SUCCESS
    , SORT_MOVIE_FAILED

    , GET_FILTERS_SUCCESS
    , GET_FILTERS_FAILED
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
                payload: {
                    errMsg: 'Не удалось загрузить фильм :\'('
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
        })

        const fail = () => {
            dispatch({
                type: EDIT_MOVIE_FAILED,
                payload: {
                    errMsg: 'Не удалось отредактировать фильм :\'('
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
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}

export function findFilms() {

    return (dispatch) => {
        const fail = () => {
            dispatch({
                type: GET_MOVIE_FAILED,
                payload: {
                    errMsg: 'Не удалось загрузить список фильмов :\'('
                }
            })
        }

        $.ajax('/findFilms', {
            type: 'GET'
        })
            .done((data) => {

                data.isSuccess
                    ? dispatch({
                        type: GET_MOVIE_SUCCESS,
                        payload: {
                            filmsList: data.filmsList
                            , filters: data.filters
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}

export function sortFilms(request) {
    return (dispatch) => {
        dispatch({
            type: SORT_MOVIE_REQUEST
        })

        const fail = () => {
            dispatch({
                type: SORT_MOVIE_FAILED,
                payload: {
                    errMsg: 'Не удалось загрузить список фильмов :\'('
                }
            })
        }

        $.ajax('/sortFilms', {
            method: 'POST',
            data: request
        })
            .done((data) => {
                data.isSuccess
                    ? dispatch({
                        type: SORT_MOVIE_SUCCESS,
                        payload: {
                            filmsList: data.filmsList
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}

export function getFilters() {
    return (dispatch) => {

        const fail = () => {
            dispatch({
                type: GET_FILTERS_FAILED,
                payload: {
                    errMsg: 'Не удалось обновиьт список фильтров :\'('
                }
            })
        }

        $.ajax('/getFilters')
            .done((data) => {
                data.isSuccess
                    ? dispatch({
                        type: GET_FILTERS_SUCCESS,
                        payload: {
                            filters: data.filters
                        }
                    })
                    : fail()
            })
            .fail(fail)
    }
}