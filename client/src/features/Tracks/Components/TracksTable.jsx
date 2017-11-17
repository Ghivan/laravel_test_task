import React from 'react';
import isEmpty from 'lodash/isEmpty';

export default ({albums, tracks}) => {
    if (isEmpty(tracks) || isEmpty(albums)) return <p className="alert text-center"><em>There is no tracks!</em></p>;
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
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(tracks).map(track_id => (
                        <tr key={tracks[track_id].id}>
                            <td><span className="fa fa-music" /></td>
                            <td>{tracks[track_id].id}</td>
                            <td>{tracks[track_id].name}</td>
                            <td>{tracks[track_id].musician}</td>
                            <td>{tracks[track_id].duration}</td>
                            <td>{albums[tracks[track_id].album_id] ? albums[tracks[track_id].album_id].name : 'Single'}</td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
}