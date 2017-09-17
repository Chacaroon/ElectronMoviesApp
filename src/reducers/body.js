import {
    ADD_MOVIE_REQUEST
    , ADD_MOVIE_SUCCESS
    , ADD_MOVIE_FAILED

    , GET_MOVIE_REQUEST
    , GET_MOVIE_SUCCESS
    , GET_MOVIE_FAILED

    , EDIT_MOVIE_REQUEST
    , EDIT_MOVIE_SUCCESS
    , EDIT_MOVIE_FAILED

    , SORT_MOVIE_REQUEST
    , SORT_MOVIE_SUCCESS
    , SORT_MOVIE_FAILED
} from '../constants/Body'

let initialState = {
    filmsList: [],
    fetching: false,
    err: false
}

export default function stateBody(state = initialState, action) {

    switch (action.type) {

        /*
         * Add film
         */

        case ADD_MOVIE_REQUEST: {
            return {...state, fetching: action.payload.fetching}
        }
        case ADD_MOVIE_SUCCESS: {
            const {filmsList} = state
            filmsList.push(action.payload.data)
            return {...state, filmsList: filmsList, fetching: action.payload.fetching}
        }

        case ADD_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: action.payload.fetching}
        }

        /*
         * Get film
         */

        case GET_MOVIE_REQUEST: {
            return {...state, fetching: action.payload.fetching}
        }

        case GET_MOVIE_SUCCESS: {
            return {...state, filmsList: action.payload.data, fetching: action.payload.fetching}
        }

        case GET_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: action.payload.fetching}
        }

        /*
         * Edit film
         */

        case EDIT_MOVIE_REQUEST: {
            return {...state, fetching: action.payload.fetching}
        }

        case EDIT_MOVIE_SUCCESS: {
            let filmsList = state.filmsList
            filmsList.find((element, index) => {
                if (element.id == action.payload.film.id)
                {
                    filmsList[index] = action.payload.film
                }
            })

            return {...state, filmsList: filmsList, fetching: action.payload.fetching}
        }

        case EDIT_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: action.payload.fetching}
        }

        /*
         * Sort films
         */

        case SORT_MOVIE_REQUEST: {
            return {...state, fetching: action.payload.fetching}
        }

        case SORT_MOVIE_SUCCESS: {
            return {...state, filmsList: action.payload.filmsList, fetching: action.payload.fetching}
        }

        case SORT_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: action.payload.fetching}
        }

        default:
            return state
    }
}