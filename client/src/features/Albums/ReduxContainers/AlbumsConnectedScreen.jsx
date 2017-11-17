import React from 'react';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import AlbumsActionCreator from '../AlbumsActionCreator';

import AlbumScreen from '../Components/AlbumScreen';

const mapStateToProps = (state, {id}) => {
    const album = id ? state.albums.list[id] : {};
    const tracks = state.tracks.groupedByAlbums[id] || [];

    return {
        album,
        tracks
    }
};

const ActionCreator = {
    ...AlbumsActionCreator
};

const ConnectedAlbumScreen = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(AlbumScreen);

export default ({id, history}) => (
    <Provider store={store}>
        <ConnectedAlbumScreen id={id} history={history}/>
    </Provider>);