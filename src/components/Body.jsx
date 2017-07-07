import React, {Component} from 'react'; //eslint-disable-line
import AddMovie from './addMovie.jsx' //eslint-disable-line

export default class Body extends Component {

    render() {

        const list = this.props.movieList.map((item, index) => {
            return <div key={index}>
                <p>{item.title}</p>
                <p>{item.body}</p>
                <p>{item.rating}</p>
            </div>
        })

        return <div>
            {list}
            <AddMovie/>
        </div>
    }
}