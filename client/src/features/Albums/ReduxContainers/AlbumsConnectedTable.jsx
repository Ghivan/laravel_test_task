import React from 'react';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import AlbumsActionCreator from '../AlbumsActionCreator';

import AlbumsTable from '../Components/AlbumsTable';

const mapStateToProps = state => {
    return {
        albums: state.albums.list,
        tracks: state.tracks.groupedByAlbums
    }
};

const ActionCreator = {
    ...AlbumsActionCreator
};

const ConnectedAlbumsTable = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(AlbumsTable);

export default () => (
    <Provider store={store}>
        <ConnectedAlbumsTable />
    </Provider>);