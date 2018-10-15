import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const selectedAlbum = albumData.find( (album) => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: selectedAlbum,
      currentSong: selectedAlbum.songs[0],
      isPlaying: false,
      songHover: false,
      hoveredSongIndex: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = selectedAlbum.songs[0].audioSrc;
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

  handleSongEnter(index) {
    this.setState({ songHover: true, hoveredSongIndex: index});
  }

  handleSongLeave() {
    this.setState({ songHover: false, hoveredSongIndex: null });
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) => {
                let songNumber = index + 1;
                let renderPauseIcon = this.state.isPlaying && (this.state.currentSong === song);
                let renderPlayIcon = !this.state.isPlaying && (this.state.currentSong === song);
                let songNumberColumnDisplay = <td>{songNumber}</td>;

                if (renderPauseIcon)
                {songNumberColumnDisplay = <td><span className="ion-md-pause"></span></td>}
                else if (renderPlayIcon)
                {songNumberColumnDisplay = <td><span className="ion-md-play"></span></td>}
                else if ((index === this.state.hoveredSongIndex) && this.state.songHover)
                {songNumberColumnDisplay = <td><span className="ion-md-play"></span></td>}

                return (
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongEnter(index)} onMouseLeave={() => this.handleSongLeave()}>
                    {songNumberColumnDisplay}
                    <td>{song.title}</td>
                    <td>{song.duration} seconds</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
        />
      </section>
    );
  }
}

export default Album;
