import React from 'react';
import {Link} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

export default ({albums, tracks}) => {
    if (isEmpty(tracks) || isEmpty(albums)) return <p className="alert text-center"><em>There is no albums!</em></p>;
    return (
        <table className='table table-striped'>
            <thead>
            <tr>
                <th>Album ID</th>
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
                            <Link className="catalog-link" to={`/albums/${album_id}`}>{albums[album_id].name}</Link>
                        </td>
                        <td>
                            {albums[album_id].year}
                        </td>
                        <td>
                            {
                                tracks[album_id] ?
                                    <ul className="list-group list-group-item-text">
                                        {tracks[album_id].map(track => (
                                                <li key={track.id}>{track.name}</li>
                                            )
                                        )
                                        }
                                    </ul> :
                                    <em>There is no tracks here.</em>
                            }

                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}