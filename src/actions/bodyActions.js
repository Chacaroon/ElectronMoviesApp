import {
    ADD_MOVIE_FAILED,
    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,

    /*GET_MOVIE_REQUEST,
    GET_MOVIE_SUCCESS,
    GET_MOVIE_FAILED*/
} from '../constants/Body'
import $ from 'jquery'

export function addMovie(title, description, rating, genre, year) {
    return (dispatch) => {

        dispatch({
            type: ADD_MOVIE_REQUEST
        })

        const sendData = {
            title: title,
            description: description,
            rating: rating,
            genre: genre,
            year: year
        }

        const fail = () => {
            dispatch({
                type: ADD_MOVIE_FAILED,
                err: true,
                payload: new Error('Не удалось загрузить фильм')
            })
        }

        $.ajax('/addMovie', {
            method: 'POST',
            data: sendData
        })
            .done((data) => {
                data.isSuccess
                    ? dispatch({
                        type: ADD_MOVIE_SUCCESS,
                        payload: sendData
                    })
                    : fail()
            })
            .fail(fail)
    }
}

/*
export function getMovies(year, genre, request) {
    return (dispatch) => {
        dispatch({
            type: GET_MOVIE_REQUEST
        })

        let request = '/'

        $.ajax()
    }
}*/
