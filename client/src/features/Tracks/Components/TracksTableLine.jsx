import React from 'react';

const TracksTableLine = ({track, album, removeTrack}) => {
    return (
        <tr>
            <td><span className="fa fa-music"/></td>
            <td>{track.id}</td>
            <td>{track.name}</td>
            <td>{track.musician}</td>
            <td>{track.duration}</td>
            <td>{album ? album.name : 'Single'}</td>
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
};

export default TracksTableLine;