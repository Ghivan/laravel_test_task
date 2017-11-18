import {batchActions} from 'redux-batched-actions';
import ActionTypes from './TracksActionTypes';

export const fetchTracks = tracks => ({
    type: ActionTypes.FETCH,
    payload: {
        tracks
    }
});

export const updateTrack = (trackId, updated) => ({
    type: ActionTypes.UPDATE,
    payload: {
        id: trackId,
        updated
    }
});

export const addTrack = added => ({
    type: ActionTypes.ADD,
    payload: {
        added
    }
});

export const removeTrack = trackId => ({
    type: ActionTypes.REMOVE,
    payload: {
        id: trackId
    }
});

export default {
    fetchTracks: () => {
        return (dispatch, getState, api) => {
            return api.TrackService.getAll()
                .then(tracks => {
                    dispatch(fetchTracks(tracks));
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    },

    updateTrack: (updated) => {
        return (dispatch, getState, api) => {
            if (Array.isArray(updated)) {
                Promise.all(updated.map(track => {
                    return api.TrackService.update(track.id, track)
                }))
                    .then(tracks => {
                        dispatch(
                            batchActions(
                                tracks.map(track => updateTrack(track.id, track)),
                                ActionTypes.MASS_UPDATE
                            )
                        );
                    })
            } else {
                return api.TrackService.update(updated.id, updated)
                    .then(track => {
                        dispatch(updateTrack(updated.id, track));
                    })
                    .catch(err => {
                        console.warn(err)
                    })
            }
        };
    },

    addTrack: added => {
        return (dispatch, getState, api) => {
            if (Array.isArray(added)) {
                Promise.all(added.map(api.TrackService.add))
                    .then(tracks => {
                        dispatch(
                            batchActions(
                                tracks.map(track => addTrack(track)),
                                ActionTypes.MASS_ADD
                            )
                        );
                    })
            } else {
                return api.TrackService.add(added)
                    .then(newTrack => {
                        dispatch(addTrack(newTrack))
                    })
                    .catch(err => {
                        console.warn(err)
                    })
            }
        };
    },

    removeTrack: trackId => {
        return (dispatch, getState, api) => {
            return api.TrackService.remove(trackId)
                .then(res => {
                    dispatch(removeTrack(res.id));
                })
                .catch(err => {
                    console.warn(err)
                })
        };
    }
};