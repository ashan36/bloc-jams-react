import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const selectedAlbum = albumData.find( (album) => {
      return album.slug === this.props.match.params.slug
    });

    this.audioElement = document.createElement('audio');
    this.audioElement.src = selectedAlbum.songs[0].audioSrc;

    this.state = {
      album: selectedAlbum,
      currentSong: selectedAlbum.songs[0],
      currentTime: 0,
      duration: selectedAlbum.songs[0].duration,
      isPlaying: false,
      songHover: false,
      hoveredSongIndex: null
    };
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.src = null;
    this.audioElement = null;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    }
    else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
  }

  handleSongEnter(index) {
    this.setState({ songHover: true, hoveredSongIndex: index});
  }

  handleSongLeave() {
    this.setState({ songHover: false, hoveredSongIndex: null });
  }

  formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainder = Math.floor(seconds - (minutes * 60));
    var display = "--:--";
    if (seconds === null || isNaN(seconds)) {
      return display;
    }
    else if (minutes < 10 && remainder < 10) {
      display = "0" + minutes + ":" + "0" + remainder;
      return display;
    }
    else if (minutes < 10 && remainder >= 10) {
      display = "0" + minutes + ":" + remainder;
      return display;
    }
    else if (minutes >= 10 && remainder < 10) {
      display = minutes + ":" + "0" + remainder;
      return display;
    }
  }

  render() {
    return (
      <section>
        <div className="nav-sidebar container">
          <h2 className="hero-title">Play Album</h2>
          <nav className="main-nav">
            <Link className="row" to='/library'>&lt; Library</Link>
          </nav>
        </div>
        <section className="album-container container">
          <div className="row justify-content-center">
            <section id="album-info" className="col-lg-auto">
              <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
              <div className="album-details">
                <h1 id="album-title">{this.state.album.title}</h1>
                <h2 className="artist">{this.state.album.artist}</h2>
                <div id="release-info"><h3>{this.state.album.releaseInfo}</h3></div>
              </div>
            </section>
            <section id="song-player-container" className="col-lg-5 align-self-center">
              <table id="song-list" className="row align-items-center">
                <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                </colgroup>
                <tbody>
                  {
                    this.state.album.songs.map( (song, index) => {
                      let renderPauseIcon = this.state.isPlaying && (this.state.currentSong === song);
                      let renderPlayIcon = !this.state.isPlaying && (this.state.currentSong === song);
                      let songNumberColumnDisplay = <td className="number-column">{index + 1}</td>;

                      if (renderPauseIcon)
                      {songNumberColumnDisplay = <td className="number-column"><span className="ion-md-pause"></span></td>}
                      else if (renderPlayIcon)
                      {songNumberColumnDisplay = <td className="number-column"><span className="ion-md-play"></span></td>}
                      else if ((index === this.state.hoveredSongIndex) && this.state.songHover)
                      {songNumberColumnDisplay = <td className="number-column"><span className="ion-md-play"></span></td>}

                      return (
                        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongEnter(index)} onMouseLeave={() => this.handleSongLeave()}>
                          {songNumberColumnDisplay}
                          <td className="song-column">{song.title}</td>
                          <td className="duration-column">{this.formatTime(song.duration)}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <PlayerBar
                className="row justify-content-center"
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.state.currentTime}
                duration={this.state.duration}
                volume={this.audioElement.volume}
                formattedCurrentTime={this.formatTime(this.state.currentTime)}
                formattedDuration={this.formatTime(this.state.duration)}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
              />
            </section>
          </div>
        </section>
      </section>
        );
  }
}

export default Album;
