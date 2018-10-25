import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

  render() {
    return (
      <section className="landing">
        <div className="nav-sidebar container">
          <h2 className="hero-title row">Turn the music up!</h2>
          <nav className="main-nav">
            <Link className="row" to='/library'>Library</Link>
          </nav>
        </div>
        <section className="selling-points container-fluid">
          <div className="point">
            <div className="row align-items-start">
              <h3 className="point-title text-center col">Choose your music</h3>
            </div>
            <div className="row align-items-end">
              <p className="point-description text-center col">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
          </div>
          <div className="point">
            <div className="row align-items-start">
              <h3 className="point-title text-center col">Unlimited, streaming, ad-free</h3>
            </div>
            <div className="row align-items-end">
              <p className="point-description text-center col">No arbitrary limits. No distractions.</p>
            </div>
          </div>
          <div className="point">
            <div className="row align-items-start">
              <h3 className="point-title text-center col">Mobile enabled</h3>
            </div>
            <div className="row align-items-end">
              <p className="point-description text-center col">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Landing;
