import React from 'react';
import groupBy from 'lodash/groupBy';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import AlbumsActionCreator from '../AlbumsActionCreator';

import AlbumsTable from '../Components/AlbumsTable';

const mapStateToProps = state => {
    return {
        albums: state.albums.list,
        tracks: groupBy(state.tracks.list, (track => track.album_id))
    }
};

const ActionCreator = {
    ...AlbumsActionCreator
};

const ConnectedAlbumsTable = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(AlbumsTable);

const ReduxContainerAlbumsTable = () => (
    <Provider store={store}>
        <ConnectedAlbumsTable/>
    </Provider>
);

export default ReduxContainerAlbumsTable;
