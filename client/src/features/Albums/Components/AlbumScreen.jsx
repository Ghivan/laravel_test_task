import React from 'react';
import {Link} from 'react-router-dom';

const AlbumScreen = ({album, tracks, history}) => {
    if (!album) return null;
    return (
        <div className="container-fluid container-with-padding">
            <div className="row">
                <div className="col-sm-2 col-md-5">
                    <img src="/images/album.jpg" alt="cover"/>
                </div>
                <div className="col-sm-10 col-md-7">
                    <h1>{album.name}</h1>
                    <p>{album.year}</p>
                </div>
            </div>
            <h4 className="card-title">Tracks</h4>
            <ul>
                {
                    tracks.length > 0
                        ? tracks.map(track => (
                            <li key={track.id}>{`${track.name} (${track.musician}, ${track.duration})`}</li>
                        ))
                        : <p><em>There is no tracks.</em></p>
                }
            </ul>
            <div className="buttons-block">
                <Link className="btn btn-outline-primary"
                      to={`/albums/edit/${album.id}`}
                >Edit</Link>
                <button className="btn btn-outline-secondary"
                        onClick={() => {
                            history.length > 2 ? history.goBack() : history.push('/albums')
                        }}>Back
                </button>
            </div>
        </div>
    )
};

export default AlbumScreen;