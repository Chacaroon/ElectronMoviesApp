/*eslint-disable*/
import React, {Component} from "react";
import $ from "jquery";
/*eslint-enable*/

export default class addMovie extends Component {

    onSubmit(e) {
        const t = e.target
        let lol = {}

        for (let i = 0; i < 2; i++) {
            lol[t[i].name] = t[i].value
        }

        $.ajax('http://localhost:3000/foo', {
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        })
            .done((out) => {
                console.log('dsflsd', out) //eslint-disable-line
            })
            .fail((err) => {
                console.log(err) //eslint-disable-line
            })

        e.preventDefault()
    }

    render() {
        return <form onSubmit={::this.onSubmit}>
            <input type="text" name="title"/>
            <input type="text" name="body"/>
            <button type="submit">
                test
            </button>
        </form>
    }
}
