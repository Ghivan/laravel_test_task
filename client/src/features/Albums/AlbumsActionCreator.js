import ActionTypes from './AlbumsActionsTypes';

export const fetchAlbums = albums => ({
    type: ActionTypes.FETCH,
    payload: {
        albums
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
    }
};