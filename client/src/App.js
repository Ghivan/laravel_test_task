import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Menu from './features/Menu/Menu';
import AlbumsTable from './features/Albums/ReduxContainers/AlbumsConnectedTable';
import AlbumScreen from './features/Albums/ReduxContainers/AlbumsConnectedScreen';
import TracksTable from './features/Tracks/ReduxContainers/TracksConnectedTable';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Menu/>
                    <Switch>
                        <Route path="/albums/:id"
                               render={({match, history}) => (
                                   <AlbumScreen id={match.params.id} history={history} />)
                               }
                        />

                        <Route path="/albums"
                               render={() => <AlbumsTable />}
                        />

                        <Route path="/tracks"
                               render={() => <TracksTable />}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
