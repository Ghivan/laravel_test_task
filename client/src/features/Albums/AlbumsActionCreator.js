import {batchActions} from 'redux-batched-actions';

import ActionTypes from './AlbumsActionsTypes';
import {removeTrack} from '../Tracks/TracksActionCreator';
import {addTrack} from '../Tracks/TracksActionCreator';

export const fetchAlbums = albums => ({
    type: ActionTypes.FETCH,
    payload: {
        albums
    }
});

export const updateAlbum = (id, updated) => ({
    type: ActionTypes.UPDATE,
    payload: {
        id,
        updated
    }
});

export const addAlbum = added => ({
    type: ActionTypes.ADD,
    payload: {
        added
    }
});

export const removeAlbum = albumId => ({
    type: ActionTypes.REMOVE,
    payload: {
        id: albumId
    }
});

export default {
    fetchAlbums: () => {
        return (dispatch, getState, api) => {
            return api.AlbumService.getAll()
                .then(albums => {
                    dispatch(fetchAlbums(albums));
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    },

    updateAlbum: (id, updated) => {
        return (dispatch, getState, api) => {
            return api.AlbumService.update(id, updated)
                .then(album => {
                    dispatch(updateAlbum(id,album));
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    },

    addAlbum: (addedAlbum, tracks) => {
        return (dispatch, getState, api) => {
            return api.AlbumService.add(addedAlbum)
                .then(album => {
                    dispatch(addAlbum(album));
                    if (tracks.length>0){
                        return Promise.all(tracks.map(track => {
                            track.album_id = album.id;
                            return api.TrackService.add(track)
                        })
                        )
                    }
                })
                .then(newTracks => {
                    dispatch(
                        batchActions(
                            newTracks.map(addTrack),
                            ActionTypes.ADD_RELATED_TRACKS
                        )
                    );
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    },

    removeAlbum: albumId => {
        return (dispatch, getState, api) => {
            return api.AlbumService.remove(albumId)
                .then(res => {
                    const tracksInAlbum = getState().tracks.list.filter(track => track.album_id == res.id);
                    if (tracksInAlbum.length > 0){
                        dispatch(
                            batchActions(
                                tracksInAlbum.map(track => removeTrack(track.id)),
                                ActionTypes.REMOVE_RELATED_TRACKS
                            )
                        );
                    }

                    dispatch(removeAlbum(res.id))
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    }
};