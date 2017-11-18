import React from 'react';
import filter from 'lodash/filter';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import AlbumsActionCreator from '../AlbumsActionCreator';
import TracksActionCreator from '../../Tracks/TracksActionCreator';

import AlbumEditForm from '../Components/AlbumEditForm';

const mapStateToProps = (state, {id}) => {
    id = parseInt(id, 10);
    const album = id ? state.albums.list.find(album => album.id === id) : null;
    const tracks = filter(state.tracks.list, (track => track.album_id === id));
    return {
        album,
        tracks
    }
};

const ActionCreator = {
    ...AlbumsActionCreator,
    ...TracksActionCreator
};

const ConnectedAlbumEditForm = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(AlbumEditForm);

const ReduxContainerAlbumEditForm = ({id, history}) => (
    <Provider store={store}>
        <ConnectedAlbumEditForm id={id} history={history}/>
    </Provider>
);

export default ReduxContainerAlbumEditForm;