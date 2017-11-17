import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reduxBatch} from '@manaflair/redux-batch';
import thunk from 'redux-thunk';

import AlbumService from './api/AlbumService';
import TrackService from './api/TrackService';

import AlbumsReducer from './features/Albums/AlbumReducer';
import AlbumsActionCreator from './features/Albums/AlbumsActionCreator';
import TracksReducer from './features/Tracks/TracksReducer';
import TracksActionCreator from './features/Tracks/TracksActionCreator';

const CombinedReducer = combineReducers({
        albums: AlbumsReducer,
        tracks: TracksReducer
    }
);

const store = createStore(CombinedReducer, composeWithDevTools(
    reduxBatch,
    applyMiddleware(
        thunk.withExtraArgument({
            AlbumService,
            TrackService
        })
    )));

store.dispatch([TracksActionCreator.fetchTracks(), AlbumsActionCreator.fetchAlbums()]);

export default store;