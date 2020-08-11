import React, { Component } from "react";
import axios from "axios";

import View from "./View";
import Search from "./Search";
import InfoBar from "./infoBar";
import Nav from "./Nav";

import DoublyLinkedList from "./doublyLinkedList";

import "./Slideshow.css";

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: new DoublyLinkedList(),
      input: "",
      playing: false,
      currentImage: null,
      isNew: true
    };
  }
  // The below version of loop didn't allow users to
  // Navigate backwards from tick 0.
  // loop = (num) => num % this.state.images.length;

  loop = (num) => {
    const length = this.state.images.length - 1;
    if (num < 0) return length - 1;
    if (num >= length) return 0;
    return num;
  };

  sendRequest = () => {
    clearInterval(this.state.timer);
    const FD = new FormData();
    FD.set("searchTerm", `${this.state.input}`);
    axios({
      method: "post",
      url: "https://open-access-slideshow.herokuapp.com/",
      data: FD,
    }).then((r) => {
      this.setState({ images: DoublyLinkedList.fromArray(r.data, true) });
      this.setState({
        timer: setInterval(() => {
          this.setState((state) => ({
            currentImage: state.currentImage.next,
            isNew: false
          }));
        }, 8000),
        playing: true,
        isNew: true,
      });
      this.setState((state) => ({ currentImage: state.images.head,}));
    });
  };

  playPause = () => {
    if (this.state.playing) clearInterval(this.state.timer);
    else {
      // Combining the two STATEments below caused some odd problems.
      this.setState((state) => ({currentImage: state.currentImage.next, isNew: false}));
      this.setState({
        timer: setInterval(() => {
          this.setState((state) => ({
            currentImage: state.currentImage.next,
            isNew: false
          }));
        }, 8000),
      });
    }
    this.setState((state) => ({ playing: !state.playing }));
  };

  handleNav = (goFoward) => {
    clearInterval(this.state.timer);
    this.setState({playing: false})
    if (goFoward) {
      // I added isNew to this setState (and in the PlayPause above) because without it, skipping images before the timer
      // Had triggered once would keep their transitions from playing.
      this.setState((state) => ({  currentImage: state.currentImage.next, isNew: false }));
    } else {
      this.setState((state) => ({  currentImage: state.currentImage.prev, isNew: false}));
    }

  };

  type = (input) => this.setState({ input });

  render() {
    // let startingImage = new Object(this.state.currentImage?.val)
    return (
      <div id="wrapper">
        <Search
          handleSearch={this.sendRequest}
          input={this.state.input}
          handleInput={this.type}
        />
        {( this.state.currentImage &&
        <div className="slideshow">
          <Nav
            begin={this.state.images.length > 0}
            forward={false}
            handleNav={this.handleNav}
          />
          <View
            handlePlaying={this.playPause}
            playing={this.state.playing}
            text={this.state.input}
            prevImage={this.state.currentImage?.prev.val}
            currentImage={this.state.currentImage?.val}
            nextImage={this.state.currentImage?.next.val}
            begin={this.state.images.length > 0}
            isNew = {this.state.isNew}
          />
          <Nav
            begin={this.state.images.length > 0}
            forward={true}
            handleNav={this.handleNav}
          />
        </div>)}
        <InfoBar
          className={"information"}
          artist={this.state.currentImage?.val.artist}
          title={this.state.currentImage?.val.title}
          source={this.state.currentImage?.val.source}
        />
      </div>
    );
  }
}

export default Slideshow;
