import React from 'react';
import isEmpty from 'lodash/isEmpty';
import TracksEditTableLine from './TracksEditTableLine';

const TracksEditTable = ({tracks, errors, removeTrackFromAlbum, onInputChange, onInputBlur}) => {
    if (isEmpty(tracks)) return <p className="alert text-center"><em>There is no tracks!</em></p>;
    return (
        <div className="row">
            <p className="card-title"><strong>Tracks:</strong></p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Musician</th>
                    <th>Duration</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {tracks.map((track, index) => (
                    <TracksEditTableLine key={index}
                                         track={track}
                                         errors={errors}
                                         removeTrackFromAlbum={removeTrackFromAlbum}
                                         onInputChange={onInputChange}
                                         onInputBlur={onInputBlur}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default TracksEditTable;