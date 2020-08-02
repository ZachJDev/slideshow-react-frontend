import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

import './Nav.css'

class Nav extends Component {
    static defaultProps = {
        // forward: true
    }
    navigate = () => this.props.handleNav(this.props.forward)

    render() {
        return (
            (this.props.begin && <div className="nav-wrap" onClick={this.navigate}>
                {this.props.forward ? 
                <FontAwesomeIcon className="icon" icon={faChevronRight}/> :
                <FontAwesomeIcon className="icon" icon={faChevronLeft}/>}
            </div>)
        )
    }
}

export default Nav