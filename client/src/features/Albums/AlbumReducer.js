import ActionTypes from './AlbumsActionsTypes';

const initialState = {
    list: []
};

const reducerFetchAlbums = (state, action) => {
    return {
        ...state,
        list: action.payload.albums
    };
};

const reducerUpdateAlbum = (state, action) => {
    const updatedAlbumId = action.payload.id;
    const newAlbumsList = state.list.slice();
    const albumIndex = newAlbumsList.findIndex(album => album.id == updatedAlbumId);
    newAlbumsList.splice(albumIndex, 1, action.payload.updated);
    return {
        ...state,
        list: newAlbumsList
    };
};

const reducerAddAlbum = (state, action) => {
    const newAlbumsList = state.list.slice();
    newAlbumsList.push(action.payload.added);
    return {
        ...state,
        list: newAlbumsList
    };
};

const reducerRemoveAlbum = (state, action) => {
    const removedAlbumId = action.payload.id;
    const newAlbumsList = state.list.slice();
    if (removedAlbumId) {
        const albumIndex = newAlbumsList.findIndex(album => album.id == removedAlbumId);
        newAlbumsList.splice(albumIndex, 1);
    }

    return {
        ...state,
        list: newAlbumsList
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH:
            return reducerFetchAlbums(state, action);
        case ActionTypes.UPDATE:
            return reducerUpdateAlbum(state, action);
        case ActionTypes.ADD:
            return reducerAddAlbum(state, action);
        case ActionTypes.REMOVE:
            return reducerRemoveAlbum(state, action);
        default:
            return state
    }
};