import React from 'react';

import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';

import Validator from '../../../utils/Validator';
import TRACK_FIELDS from '../../Tracks/TrackFieldsTypes';

import TracksEditTable from '../../Tracks/Components/TracksEditTable';

const MODE = {
    DEFAULT: 'default',
    CHANGED: 'changed',
    CREATED: 'created'
};


const AlbumTemplate = {
    name: '',
    year: new Date().getFullYear(),
    status: MODE.CREATED
};

class AlbumEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: props.album ? clone(props.album) : clone(AlbumTemplate),
            tracks: props.tracks ? props.tracks.slice().map(track => {
                track.status = MODE.DEFAULT;
                return track
            }) : [],
            errors: {},
            readyToUpdate: false
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const PropsToUpdate = {};
        if (nextProps.album && nextProps.album.id !== this.state.album.id) {
            const selectedAlbum = clone(nextProps.album);
            selectedAlbum.status = MODE.DEFAULT;
            PropsToUpdate.album = selectedAlbum;
        }

        if (!nextProps.album) {
            PropsToUpdate.album = clone(AlbumTemplate);
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
            case TRACK_FIELDS.NAME:
                track.name = newValue;
                break;
            case TRACK_FIELDS.MUSICIAN:
                track.musician = newValue;
                break;
            case TRACK_FIELDS.DURATION:
                track.duration = newValue;
                break;
        }
        track.status = (track.status === MODE.CREATED) ? MODE.CREATED : MODE.CHANGED;
        newTracksList.splice(trackIndex, 1, track);

        this.setState({
            tracks: newTracksList
        })

    };

    addNewTrackToAlbum = () => {
        const newTracksList = this.state.tracks.slice();
        const track = {
            id: Date.now(),
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
        const errors = clone(this.state.errors);
        const track = this.state.tracks.find(track => track.id === id);
        const trackIndex = this.state.tracks.findIndex(track => track.id === id);
        if (track) {
            if (track.status === MODE.CREATED) {
                delete errors[id];
            } else {
                track.status = MODE.CHANGED
            }
            track.album_id = null;
            (track.status === MODE.CREATED) ? newTracksList.splice(trackIndex, 1) : newTracksList.splice(trackIndex, 1, track);
            this.setState({
                tracks: newTracksList,
                errors
            })
        }
    };

    validateTrackField = (trackId, field, value) => {
        const errors = clone(this.state.errors);
        errors[trackId] = errors[trackId] || {};
        switch (field) {
            case TRACK_FIELDS.NAME:
                Validator.validateText(value)
                    ? delete errors[trackId][TRACK_FIELDS.NAME]
                    : errors[trackId][TRACK_FIELDS.NAME] = 'This field should not be empty!';
                break;
            case TRACK_FIELDS.MUSICIAN:
                Validator.validateText(value)
                    ? delete errors[trackId][TRACK_FIELDS.MUSICIAN]
                    : errors[trackId][TRACK_FIELDS.MUSICIAN] = 'This field should not be empty!';
                break;
            case TRACK_FIELDS.DURATION:
                Validator.validateDuration(value)
                    ? delete errors[trackId][TRACK_FIELDS.DURATION]
                    : errors[trackId][TRACK_FIELDS.DURATION] = 'Format \'M:SS\'';
                break;
        }

        if (isEmpty(errors[trackId])) {
            delete errors[trackId];
        }

        this.setState({errors});
    };

    validateAlbumName = albumName => {
        const errors = clone(this.state.errors);
        if (Validator.validateText(albumName)) {
            delete errors.albumName
        } else {
            errors.albumName = 'This field should not be empty!'
        }
        this.setState({errors})
    };

    validateAlbumYear = albumYear => {
        const errors = clone(this.state.errors);
        if (Validator.validateYear(albumYear)) {
            delete errors.albumYear
        } else {
            errors.albumYear = 'Field format: YYYY (less or equal current year)'
        }
        this.setState({errors})
    };

    saveChanges = e => {
        e.preventDefault();

        if (!isEmpty(this.state.errors)) {
            return;
        }

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

        if (updatedTracks.length > 0) {
            this.props.updateTrack(updatedTracks);
        }

        const createdTracks = filter(this.state.tracks, track => track.status === MODE.CREATED);

        if (createdTracks.length > 0 && this.state.album.status !== MODE.CREATED) {
            this.props.addTrack(createdTracks);
        }

        if (this.state.album.status === MODE.CHANGED ||
            createdTracks.length > 0 ||
            updatedTracks.length
        ) {
            this.props.history.push('/albums')
        }
    };

    render() {
        return (
            <div className="p-1">
                <h4>{this.props.id ? `Editing album "${this.state.album.name}"` : 'Creating album'}</h4>
                <form>
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-6  offset-md-3">
                            <div className="input-group row p-3">
                                <span className="input-group-addon">Album name:</span>
                                <input
                                    className={`form-control  ${this.state.errors.albumName ? 'is-invalid' : ''}`}
                                    id="albumName"
                                    value={this.state.album.name}
                                    onChange={this.handleAlbumChange}
                                    onBlur={e => this.validateAlbumName(e.target.value)}
                                    placeholder="Album name"/>
                                <div className="invalid-feedback col-sm-12">
                                    {this.state.errors.albumName}
                                </div>
                            </div>
                            <div className="input-group row p-3">
                                <span className="input-group-addon">Release year:</span>
                                <input
                                    className={`form-control  ${this.state.errors.albumYear ? 'is-invalid' : ''}`}
                                    id="albumYear"
                                    value={this.state.album.year}
                                    onChange={this.handleAlbumChange}
                                    onBlur={e => this.validateAlbumYear(e.target.value)}
                                    placeholder="Album year"/>
                                <div className="invalid-feedback col-sm-12">
                                    {this.state.errors.albumYear}
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        filter(this.state.tracks, track => track.album_id !== null).length > 0
                            ? <TracksEditTable tracks={this.state.tracks}
                                               errors={this.state.errors}
                                               removeTrackFromAlbum={this.removeTrackFromAlbum}
                                               onInputChange={this.handleTrackChange}
                                               onInputBlur={this.validateTrackField}
                            />
                            : null
                    }

                    <div className="p-1">
                        <button className="btn btn-info m-1"
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        this.addNewTrackToAlbum();
                                    }
                                }>
                            Add new track
                        </button>
                    </div>
                    <div className="p-1">
                        <button className='btn btn-success m-1'
                                onClick={this.saveChanges}
                        >
                            Save
                        </button>
                        <button className="btn btn-default m-1"
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.history.push('/albums');
                                }}>
                            To albums
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AlbumEditForm;