import React from 'react';

import {connect, Provider} from 'react-redux';
import store from '../../../AppStore';
import {bindActionCreators} from '../../../utils/utils';

import TracksActionCreator from '../TracksActionCreator';

import TracksTable from '../Components/TracksTable';

const mapStateToProps = state => {
    return {
        tracks: state.tracks.list,
        albums: state.albums.list
    }
};

const ActionCreator = {
    ...TracksActionCreator
};

const ConnectedTracksTable = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(TracksTable);

export default () => (
    <Provider store={store}>
        <ConnectedTracksTable />
    </Provider>);