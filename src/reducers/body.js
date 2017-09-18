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
    filmsList: []
    , filters: {
        year: []
        , genre: []
    }
    , fetching: false
    , err: false
    , errMsg: ''
}

export default function stateBody(state = initialState, action) {

    switch (action.type) {

        /*
         * Add film
         */

        case ADD_MOVIE_REQUEST: {
            return {
                ...state
                , fetching: true
            }
        }
        case ADD_MOVIE_SUCCESS: {
            const {filmsList} = state
            filmsList.push(action.payload.data)
            return {
                ...state
                , filmsList: filmsList
                , fetching: false
            }
        }

        case ADD_MOVIE_FAILED: {
            return {
                ...state
                , err: action.payload.err.message
                , fetching: false
            }
        }

        /*
         * Get film
         */

        case GET_MOVIE_REQUEST: {
            return {
                ...state
                , fetching: true
            }
        }

        case GET_MOVIE_SUCCESS: {
            return {
                ...state
                , filmsList: action.payload.filmsList
                , filters: action.payload.filters
                , fetching: false
            }
        }

        case GET_MOVIE_FAILED: {
            return {
                ...state
                , err: action.payload.err.message
                , fetching: false
            }
        }

        /*
         * Edit film
         */

        case EDIT_MOVIE_REQUEST: {
            return {
                ...state
                , fetching: true
            }
        }

        case EDIT_MOVIE_SUCCESS: {
            let filmsList = state.filmsList
            filmsList.find((element, index) => {
                if (element.id == action.payload.film.id)
                {
                    filmsList[index] = action.payload.film
                }
            })

            return {
                ...state, filmsList: filmsList
                , fetching: false
            }
        }

        case EDIT_MOVIE_FAILED: {
            return {
                ...state
                , err: action.payload.err.message
                , fetching: false
            }
        }

        /*
         * Sort films
         */

        case SORT_MOVIE_REQUEST: {
            return {
                ...state
                , fetching: true
            }
        }

        case SORT_MOVIE_SUCCESS: {
            return {
                ...state
                , filmsList: action.payload.filmsList
                , fetching: false
            }
        }

        case SORT_MOVIE_FAILED: {
            return {
                ...state
                , err: action.payload.err.message
                , fetching: false
            }
        }

        default:
            return state
    }
}