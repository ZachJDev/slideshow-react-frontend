import React, {Component} from 'react'
import { CSSTransition } from 'react-transition-group'


import './Slide.css'

class Slide extends Component {

    render() {
        return (
            <CSSTransition 
             in={this.props.current}
             timeout={500}
             classNames="fade"
             >
            <img key={this.props.key}  alt={this.props.title} src={this.props.imageSrc} className={this.props.className}></img>
            </CSSTransition>
        )
    }
}

export default Slide