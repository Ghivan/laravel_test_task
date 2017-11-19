import React from 'react';
import {Link} from 'react-router-dom';

const AlbumScreen = ({album, tracks, history}) => {
    if (!album) return null;
    return (
        <div>
            <div className="row p-4">
                    <img src="/images/album.jpg" alt="cover" className="m-1"/>
                    <h2>
                        <em>{album.name}</em><br/>
                        <small>{album.year}</small>
                    </h2>
            </div>
            <p className="card-title"><strong>Tracks:</strong></p>
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
                            history.push('/albums')
                        }}>Back
                </button>
            </div>
        </div>
    )
};

export default AlbumScreen;