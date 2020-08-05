import React, {Component} from 'react'

import Slide from './Slide'

import './View.css'

import playButton from '../img/play.svg'
import pauseButton from '../img/pause.svg'

class View extends Component { 

    togglePlay = (event) => {
        this.props.handlePlaying()
    }
    
    render() {
        const hide = this.props.playing ? "" : "hide " 
        const button = this.props.playing ?  pauseButton : playButton
        const restart = this.props.count === 0? "restart" : '' // Still looking for a better way to handle this...
        return (
           (this.props.begin &&
           <div className={"view-box"} onClick={this.togglePlay}>
           {}
           <img src={button} className="play-button"/>
            <Slide key={this.props.currentImage.url} imageSrc={this.props.currentImage.url} title={this.props.currentImage.title} className={"slide current-slide"} current={true} />
            <Slide key={this.props.prevImage?.url} imageSrc={this.props.prevImage?.url} title={this.props.prevImage?.title} className={"slide " + hide + restart} current={false} />
            <Slide key={this.props.nextImage.url} imageSrc={this.props.nextImage.url}  title={this.props.nextImage.title} current={false} className={"next-slide slide"} />
            </div>)
        )
            
    }
}

export default View
          