import _ from 'lodash';
import ActionTypes from './TracksActionTypes';

const initialState = {
    list: {},
    groupedByAlbums: []
};

const reducerFetchTracks = (state, action) => {
    const groupedTracks = _.groupBy(action.payload.tracks, tracks => tracks.album_id);
    const normalizedTracks = _.keyBy(action.payload.tracks, tracks => tracks.id);
    return {
        ...state,
        list: normalizedTracks,
        groupedByAlbums: groupedTracks
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH:
            return reducerFetchTracks(state, action);
        default:
            return state
    }
};