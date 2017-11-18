import React from 'react';
import isEmpty from 'lodash/isEmpty';

const getAlbumNameForTrack = (track, albums) => {
    const album = albums.find(album => album.id === track.album_id);
    return album ? album.name : 'Single';
};

const TracksTable = ({albums, tracks, removeTrack}) => {
    if (isEmpty(tracks)) return <p className="alert text-center"><em>There is no tracks!</em></p>;
    return (
        <table className='table table-striped table-hover'>
            <thead>
            <tr>
                <th/>
                <th>Track ID</th>
                <th>Name</th>
                <th>Musician</th>
                <th>Duration</th>
                <th>Album</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {
                tracks.map(track => (
                        <tr key={track.id}>
                            <td><span className="fa fa-music"/></td>
                            <td>{track.id}</td>
                            <td>{track.name}</td>
                            <td>{track.musician}</td>
                            <td>{track.duration}</td>
                            <td>{getAlbumNameForTrack(track, albums)}</td>
                            <td>
                                <button onClick={() => {
                                    removeTrack(track.id)
                                }}
                                        className="btn btn-danger btn-sm"
                                        title={`Delete track "${track.name}"`}
                                >
                                    <span className="fa fa-times" aria-hidden="true"/>
                                </button>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
};

export default TracksTable;