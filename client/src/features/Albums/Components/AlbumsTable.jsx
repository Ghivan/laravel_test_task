import React from 'react';
import {Link} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

const AlbumsTable = ({albums, tracks, removeAlbum}) => {
    if (isEmpty(albums)) return <p className="alert text-center"><em>There is no albums!</em></p>;
    return (
        <table className='table table-striped'>
            <thead>
            <tr>
                <th>Album ID</th>
                <th>Name</th>
                <th>Release year</th>
                <th>Tracks</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {albums.map(album => {
                return (
                    <tr key={album.id}>
                        <td>{album.id}</td>
                        <td>
                            {album.name} <br />
                            <Link className="catalog-link" to={`/albums/${album.id}`}>
                                <em><small>(click for details)</small></em>
                            </Link>
                        </td>
                        <td>
                            {album.year}
                        </td>
                        <td>
                            {
                                (tracks !== 'undefined' && tracks[album.id]) ?
                                    <ul className="list-group list-group-item-text">
                                        {tracks[album.id].map(track => (
                                                <li key={track.id}>{track.name}</li>
                                            )
                                        )
                                        }
                                    </ul> :
                                    <em>There is no tracks here.</em>
                            }

                        </td>
                        <td>
                            <button onClick={() => {
                                removeAlbum(album.id)
                            }}
                                    className="btn btn-danger btn-sm"
                                    title={`Delete album "${album.name}"`}
                            >
                                <span className="fa fa-times" aria-hidden="true"/>
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

export default AlbumsTable;