import {
    ADD_MOVIE_REQUEST
    , ADD_MOVIE_SUCCESS
    , ADD_MOVIE_FAILED

    , GET_MOVIE_REQUEST
    , GET_MOVIE_SUCCESS
    , GET_MOVIE_FAILED
} from '../constants/Body'

let initialState = {
    filmsList: [],
    fetching: false,
    err: false
}

export default function stateBody(state = initialState, action) {

    switch (action.type) {

        // Add film

        case ADD_MOVIE_REQUEST: {
            return {...state, fetching: true}
        }
        case ADD_MOVIE_SUCCESS: {
            const {filmsList} = state
            filmsList.push(action.payload)
            return {...state, filmsList: filmsList, fetching: false}
        }

        case ADD_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: false}
        }

        // Get film

        case GET_MOVIE_REQUEST: {
            return {...state, fetching: true}
        }

        case GET_MOVIE_SUCCESS: {
            return {...state, filmsList: action.payload, fetching: false}
        }

        case GET_MOVIE_FAILED: {
            return {...state, err: action.payload.err.message, fetching: false}
        }

        default:
            return state
    }
}