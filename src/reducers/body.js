const initialState = {
    movieList: [
        {
            title: 'asd',
            body: 'djfklsdf',
            rating: 5
        }
    ]
}

export default function stateBody(state = initialState, action) {

    switch (action.type) {
        case 'ADD_MOVIE': {
            const {movieList} = state
            movieList.push(action.payload)
            return {...state, movieList: movieList}
        }
        default:
            return state
    }
}