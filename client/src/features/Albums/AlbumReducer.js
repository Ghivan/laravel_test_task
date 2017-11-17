import keyBy from 'lodash/keyBy';
import ActionTypes from './AlbumsActionsTypes';

const initialState = {
    list: {}
};

const reducerFetchAlbums = (state, action) => {
    const normalizedAlbums = keyBy(action.payload.albums, album => album.id);
    return {
        ...state,
        list: normalizedAlbums
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH:
            return reducerFetchAlbums(state, action);
        default:
            return state
    }
};