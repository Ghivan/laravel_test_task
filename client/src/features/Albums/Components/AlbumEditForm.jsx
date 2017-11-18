import React from 'react';
import {Link} from 'react-router-dom';

import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';

const MODE = {
    DEFAULT: 'default',
    CHANGED: 'changed',
    CREATED: 'created'
};

const TrackFields = {
    NAME: 'name',
    MUSICIAN: 'musician',
    DURATION: 'duration'
};

class AlbumEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: props.album ? clone(props.album) : {
                name: '',
                year: new Date().getFullYear(),
                status: MODE.CREATED
            },
            tracks: props.tracks ? props.tracks.slice().map(track => {
                track.status = MODE.DEFAULT;
                return track
            }) : []
        }
    }

    componentWillReceiveProps(nextProps) {
        const PropsToUpdate = {};
        if (nextProps.album && nextProps.album.id !== this.state.album.id) {
            const selectedAlbum = clone(nextProps.album);
            selectedAlbum.status = MODE.DEFAULT;
            PropsToUpdate.album = selectedAlbum;
        }

        if (nextProps.tracks && !isEqual(nextProps.tracks, this.state.tracks)) {
            PropsToUpdate.tracks = nextProps.tracks.slice().map(track => {
                track.status = MODE.DEFAULT;
                return track
            });
        }

        if (!isEmpty(PropsToUpdate)) {
            this.setState(PropsToUpdate);
        }

    }

    handleAlbumChange = e => {
        const nameIsChanged = (e.target.id === 'albumName');
        const yearIsChanged = (e.target.id === 'albumYear');
        const inputValue = e.target.value;

        this.setState((prevState) => ({
            ...prevState,
            album: {
                ...prevState.album,
                name: nameIsChanged ? inputValue : prevState.album.name,
                year: yearIsChanged ? inputValue : prevState.album.year,
                status: this.props.id ? MODE.CHANGED : MODE.CREATED
            }
        }))
    };

    handleTrackChange = (id, field, newValue) => {
        const newTracksList = this.state.tracks.slice();
        const trackIndex = this.state.tracks.findIndex(track => track.id === id);
        const track = this.state.tracks.find(track => track.id === id);
        switch (field) {
            case TrackFields.NAME:
                track.name = newValue;
                break;
            case TrackFields.MUSICIAN:
                track.musician = newValue;
                break;
            case TrackFields.DURATION:
                track.duration = newValue;
                break;
        }
        track.status = (track.status === MODE.CREATED) ? MODE.CREATED :  MODE.CHANGED;
        newTracksList.splice(trackIndex, 1, track);

        this.setState({
            tracks: newTracksList
        })

    };

    addNewTrackToAlbum = () => {
        const newTracksList = this.state.tracks.slice();
        const track = {
            id:Date.now(),
            name: '',
            musician: '',
            duration: '',
            album_id: this.props.id || 'new',
            status: MODE.CREATED
        };
        newTracksList.push(track);

        this.setState({
            tracks: newTracksList
        });
    };

    removeTrackFromAlbum = id => {
        const newTracksList = this.state.tracks.slice();
        const track = this.state.tracks.find(track => track.id === id);
        const trackIndex = this.state.tracks.findIndex(track => track.id === id);
        if (track) {
            track.status = (track.status === MODE.CREATED) ? MODE.CREATED :  MODE.CHANGED;
            track.album_id = null;
            (track.status === MODE.CREATED) ? newTracksList.splice(trackIndex, 1) : newTracksList.splice(trackIndex, 1, track);
            this.setState({
                tracks: newTracksList
            })
        }
    };

    saveChanges = e => {
        e.preventDefault();

        if (this.state.album.status === MODE.CREATED) {
            this.props.addAlbum(this.state.album, this.state.tracks.map(track => {
                delete track.album_id;
                delete track.id;
                return track;
            }));
            return this.props.history.push('/albums');
        }

        if (this.state.album.status === MODE.CHANGED) {
            this.props.updateAlbum(this.props.id, this.state.album);
        }


        const updatedTracks = filter(this.state.tracks, track => track.status === MODE.CHANGED);
        if (updatedTracks.length > 0){
            this.props.updateTrack(updatedTracks);
        }

        const createdTracks = filter(this.state.tracks, track => track.status === MODE.CREATED);
        if (createdTracks.length > 0){
            this.props.addTrack(createdTracks);
        }

        return this.props.history.push('/albums');
    };

    renderEditTracksTable() {
        return (
            <div>
                <label>Tracks</label>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Musician</th>
                        <th>Duration</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tracks.map(this.renderEditTrackLine)}
                    </tbody>
                </table>
            </div>
        )
    }

    renderEditTrackLine = (track, index) => {
        if (!track.album_id) return null;
        return (
            <tr key={index} className="form-group">
                <td>
                    <input className="form-control"
                           id={`trackName${index}`}
                           value={track.name}
                           onChange={e => {
                               this.handleTrackChange(track.id, TrackFields.NAME, e.target.value)
                           }}
                           placeholder="Track name"/>
                </td>
                <td>
                    <input className="form-control"
                           id={`trackMusician${index}`}
                           value={track.musician}
                           onChange={e => {
                               this.handleTrackChange(track.id, TrackFields.MUSICIAN, e.target.value)
                           }}
                           placeholder="Track musician"/>
                </td>
                <td>
                    <input className="form-control"
                           id={`trackDuration${index}`}
                           value={track.duration}
                           onChange={e => {
                               this.handleTrackChange(track.id, TrackFields.DURATION, e.target.value)
                           }}
                           placeholder="Track duration"/>
                </td>
                <td>
                    <button onClick={e => {
                        e.preventDefault();
                        this.removeTrackFromAlbum(track.id);
                    }}
                            className="btn btn-danger btn-sm"
                            title={`Remove from album "${track.name}"`}
                    >
                        Remove from album
                    </button>
                </td>
            </tr>
        )
    };

    render() {
        return (
            <form>
                <div className="form-group">
                    <div className="input-group ">
                        <span className="input-group-addon">Album name:</span>
                        <input className="form-control"
                               id="albumName"
                               value={this.state.album.name}
                               onChange={this.handleAlbumChange}
                               placeholder="Album name"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Release year:</span>
                        <input className="form-control"
                               id="albumYear"
                               value={this.state.album.year}
                               onChange={this.handleAlbumChange}
                               placeholder="Album year"/>
                    </div>
                </div>

                {
                    filter(this.state.tracks, track => track.album_id !== null).length > 0
                        ? this.renderEditTracksTable()
                        : null
                }

                <button className="btn btn-info"
                        onClick={
                            e => {
                                e.preventDefault();
                                this.addNewTrackToAlbum();
                            }
                        }>
                    Add new track
                </button>

                <div className="buttons-block">
                    <button className="btn btn-success"
                            onClick={this.saveChanges}>
                        Save
                    </button>
                    <button className="btn btn-default"
                            onClick={e => {
                                e.preventDefault();
                                this.props.history.goBack();
                            }}>
                        Back
                    </button>
                </div>
            </form>
        )
    }
}

export default AlbumEditForm;