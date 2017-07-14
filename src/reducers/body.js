import {
    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAILED
} from '../constants/Body'

const initialState = {
    movieList: [],
    fetching: false,
    err: ''
}

export default function stateBody(state = initialState, action) {

    switch (action.type) {
        case ADD_MOVIE_REQUEST: {
            return {...state, fetching: true}
        }
        case ADD_MOVIE_SUCCESS: {
            const {movieList} = state
            movieList.push(action.payload)
            return {...state, movieList: movieList, fetching: false}
        }

        case ADD_MOVIE_FAILED: {
            return {...state, err: action.payload.message, fetching: false}
        }
        default:
            return state
    }
}