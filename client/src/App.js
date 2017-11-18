import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Menu from './features/Menu/Menu';
import AlbumsTable from './features/Albums/ReduxContainers/AlbumsConnectedTable';
import AlbumScreen from './features/Albums/ReduxContainers/AlbumConnectedScreen';
import AlbumEditForm from './features/Albums/ReduxContainers/AlbumConnectedEditForm';
import TracksTable from './features/Tracks/ReduxContainers/TracksConnectedTable';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Menu/>
                    <Switch>
                        <Route path="/albums/add/"
                               render={({history}) => (
                                   <AlbumEditForm history={history} />)
                               }
                        />

                        <Route path="/albums/edit/:id"
                               render={({match, history}) => (
                                   <AlbumEditForm id={match.params.id} history={history} />)
                               }
                        />

                        <Route path="/albums/:id"
                               render={({match, history}) => (
                                   <AlbumScreen id={match.params.id} history={history} />)
                               }
                        />

                        <Route path="/albums"
                               render={() => (<AlbumsTable />)}
                        />

                        <Route path="/tracks"
                               render={() => <TracksTable />}
                        />
                        <Redirect from='/' to='/albums'/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
