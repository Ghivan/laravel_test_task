import React from 'react';
import filter from 'lodash/filter';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import AlbumsActionCreator from '../AlbumsActionCreator';

import AlbumScreen from '../Components/AlbumScreen';

const mapStateToProps = (state, {id}) => {
    id = parseInt(id, 10);
    const album = id ? state.albums.list[id] : {};
    const tracks = filter(Object.values(state.tracks.list), (track => track.album_id === id));
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
