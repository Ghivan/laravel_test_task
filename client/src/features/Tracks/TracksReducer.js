import ActionTypes from './TracksActionTypes';

const initialState = {
    list: []
};

const reducerFetchTracks = (state, action) => {
    return {
        ...state,
        list: action.payload.tracks
    };
};

const reducerUpdateTrack = (state, action) => {
    const updatedTrackId = action.payload.id;
    const newTracksList = state.list.slice();
    const trackIndex = newTracksList.findIndex(track => track.id == updatedTrackId);
    newTracksList.splice(trackIndex, 1, action.payload.updated);
    return {
        ...state,
        list: newTracksList
    };
};

const reducerAddTrack = (state, action) => {
    const newTracksList = state.list.slice();
    newTracksList.push(action.payload.added);
    return {
        ...state,
        list: newTracksList
    };
};

const reducerRemoveTrack = (state, action) => {
    const removedTrackId = action.payload.id;
    const newTracksList = state.list.slice();
    if (removedTrackId) {
        const trackIndex = newTracksList.findIndex(track => track.id == removedTrackId);
        newTracksList.splice(trackIndex, 1);
    }

    return {
        ...state,
        list: newTracksList
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH:
            return reducerFetchTracks(state, action);
        case ActionTypes.UPDATE:
            return reducerUpdateTrack(state, action);
        case ActionTypes.ADD:
            return reducerAddTrack(state, action);
        case ActionTypes.REMOVE:
            return reducerRemoveTrack(state, action);
        default:
            return state
    }
};