import React from 'react';

import TRACK_FIELDS from '../TrackFieldsTypes';
import TrackFieldInput from './TrackFieldInput';

const TracksEditTableLine = ({track, errors, removeTrackFromAlbum, onInputChange, onInputBlur}) => {
    if (!track.album_id) return null;
    return (
        <tr className="form-group">
            <td>
                <TrackFieldInput track={track}
                                 errors={errors}
                                 fieldName={TRACK_FIELDS.NAME}
                                 onChange={onInputChange}
                                 onBlur={onInputBlur}
                />
            </td>
            <td>
                <TrackFieldInput track={track}
                                 errors={errors}
                                 fieldName={TRACK_FIELDS.MUSICIAN}
                                 onChange={onInputChange}
                                 onBlur={onInputBlur}
                />
            </td>
            <td>
                <TrackFieldInput track={track}
                                 errors={errors}
                                 fieldName={TRACK_FIELDS.DURATION}
                                 onChange={onInputChange}
                                 onBlur={onInputBlur}
                />
            </td>
            <td>
                <button onClick={e => {
                    e.preventDefault();
                    removeTrackFromAlbum(track.id);
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

export default TracksEditTableLine;