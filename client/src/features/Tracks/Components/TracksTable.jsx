import React from 'react';
import isEmpty from 'lodash/isEmpty';

import TracksTableLine from './TracksTableLine';

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
                        <TracksTableLine key={track.id}
                                         track={track}
                                         album={albums.find(album => album.id == track.album_id)}
                                         removeTrack={removeTrack}
                        />
                    )
                )
            }
            </tbody>
        </table>
    )
};

export default TracksTable;