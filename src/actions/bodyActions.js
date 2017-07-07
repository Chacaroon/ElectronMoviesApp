export function addMovie(title, body, rating) {
    return {
        type: 'ADD_MOVIE',
        payload: {title: title, body: body, rating: rating}
    }
}