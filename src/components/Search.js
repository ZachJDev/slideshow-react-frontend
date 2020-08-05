import React, {Component} from 'react'

import './Search.css'

class Search extends Component {

    handleType = (event) => {
        this.props.handleInput(event.target.value)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSearch()
    }

    render() {
        return (
            <form>
                <input className="search-bar" type="text" value={this.props.input} onChange={this.handleType} /> 
                <button className="search-button" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default Search