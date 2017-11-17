import ActionTypes from './TracksActionTypes';

export const fetchTracks = tracks => ({
    type: ActionTypes.FETCH,
    payload: {
        tracks
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
    }
};