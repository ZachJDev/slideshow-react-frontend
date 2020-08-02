import React, {Component} from 'react'
import { v4 as uuid} from 'uuid'
import { CSSTransition } from 'react-transition-group'

import Slide from './Slide'

import './View.css'

class View extends Component { 
    togglePlay = (event) => {
        this.props.handlePlaying()
    }
    
    componentDidMount() {

    }
    
    render() {
        const hide = this.props.playing ? "" : "hide" 
        return (
           (this.props.begin &&
           <div className={"view-box"} onClick={this.togglePlay}>
            <Slide key={this.props.currentImage.url} imageSrc={this.props.currentImage.url} title={this.props.currentImage.title} className={"slide current-slide"} current={true} />
            <Slide key={this.props.prevImage?.url} imageSrc={this.props.prevImage?.url} title={this.props.prevImage?.title} className={"slide " + hide} current={false} />
            <Slide key={this.props.nextImage.url} imageSrc={this.props.nextImage.url}  title={this.props.nextImage.title} current={false} className={"next-slide slide"} />
            </div>)
        )
            
    }
}

export default View
          