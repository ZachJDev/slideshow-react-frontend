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
            currentImage: state.currentImage.next
          }));
        }, 8000),

        tick: 0,
        playing: true,
      });
      this.setState((state) => ({ currentImage: state.images.head }));
    });
  };

  playPause = () => {
    if (this.state.playing) clearInterval(this.state.timer);
    else {
      // Combining the two STATEments below caused some odd problems.
      this.setState((state) => ({currentImage: state.currentImage.next}));
      this.setState({
        timer: setInterval(() => {
          this.setState((state) => ({
            currentImage: state.currentImage.next
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
      this.setState((state) => ({  currentImage: state.currentImage.next}));
    } else {
      this.setState((state) => ({  currentImage: state.currentImage.prev }));
    }

    // if (this.state.playing) {
    //   this.setState({
    //     timer: setInterval(() => {
    //       this.setState((state) => ({
    //         currentImage: state.currentImage.next
    //       }));
    //     }, 2000),
    //   });
    // }
  };

  type = (input) => this.setState({ input });

  render() {
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
