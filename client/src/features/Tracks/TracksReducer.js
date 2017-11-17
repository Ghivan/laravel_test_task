import keyBy from 'lodash/keyBy';
import ActionTypes from './TracksActionTypes';

const initialState = {
    list: {}
};

const reducerFetchTracks = (state, action) => {
    const normalizedTracks = keyBy(action.payload.tracks, tracks => tracks.id);
    return {
        ...state,
        list: normalizedTracks
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