import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  returnAlbumRows() {
    var row;
    var albums = this.state.albums.slice(0, this.state.albums.length);
    var display = [];
    for (var j = 0; j < Math.ceil(this.state.albums.length/2); j++) {
      console.log("album row output");
      let albumRow = [];
      for (var i = 0; i < 2; i++) {
        if (albums.length >= 1) {
        albumRow[i] = albums.pop();
        }
      }
      row =
      <div className="library-row row justify-content-around">
        {
          albumRow.map( (album, index) =>
            <Link className="library-album col-lg-auto" to={`/album/${album.slug}`} key={j+index}>
              <div className="row justify-content-center">{album.title}</div>
              <img className="row" src={album.albumCover} alt={album.title} />
              <div className="row justify-content-start">{album.artist}</div>
              <div className="row justify-content-start">{album.songs.length} songs</div>
            </Link>
          )
        }
      </div>;
      display = display.concat(row);
    }
    return display;
  }

  render() {
    return (
      <section className="library">
        <div className="nav-sidebar container">
          <h2 className="hero-title">Library</h2>
          <nav className="main-nav">
            <Link className="row" to='/'>&lt; Landing</Link>
          </nav>
        </div>
        <section className="album-display container">
          {this.returnAlbumRows()}
        </section>
      </section>
    );
  }
}

export default Library;
