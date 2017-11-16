import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import _ from 'lodash';

import  Menu from './features/Menu/Menu';
import AlbumsTable from './features/Albums/AlbumsTable';

import AlbumService from './api/AlbumService';
import TrackService from './api/TrackService';

class App extends Component {

    state = {
        albums: {},
        tracks: {}
    };

    componentDidMount(){
        AlbumService.getAll().then(albums => this.setState({albums: _.keyBy(albums, album => album.id)}))
        TrackService.getAll().then(tracks => this.setState({tracks: _.keyBy(tracks, track => track.id)}))
    }

    render() {
        return (
                <Router>
                    <div>
                        <Menu/>
                        <Switch>
                            <Route path="/albums"
                                   render={() => <AlbumsTable  albums={this.state.albums}
                                                               tracks={this.state.tracks}
                                   />}
                            />
                        </Switch>
                    </div>
                </Router>
        );
    }
}

export default App;
