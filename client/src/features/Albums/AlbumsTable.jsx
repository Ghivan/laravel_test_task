import React from 'react';

export default ({albums, tracks}) => {
    return (
        <table  className='table table-striped table-hover'>
            <thead>
            <tr>
                <th>Album id</th>
                <th>Name</th>
                <th>Release year</th>
                <th>Tracks</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(albums).map(album_id => {
                return (
                    <tr key={album_id}>
                        <td>
                            {album_id}
                        </td>
                        <td>
                            {albums[album_id].name}
                        </td>
                        <td>
                            {albums[album_id].year}
                        </td>
                        <td>
                            <ul>
                                {Object.keys(tracks).map(track_id => {
                                    console.log(typeof album_id);
                                    return (
                                        tracks[track_id].album_id == album_id ? <li key={track_id}>{tracks[track_id].name}</li> : null
                                    )
                                })}
                            </ul>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}