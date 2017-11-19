import React from 'react';

const TrackFieldInput = ({track, errors, fieldName, onChange, onBlur}) => {
    if (!track.album_id) return null;
    return (
            <div>
                <input className={`form-control  ${errors[track.id] && errors[track.id][fieldName] ? 'is-invalid' : ''}`}
                       id={`trackName${track.id}`}
                       value={track[fieldName]}
                       onChange={e => onChange(track.id, fieldName, e.target.value)}
                       onBlur={e => onBlur(track.id, fieldName, e.target.value)}
                       placeholder={fieldName}/>
                <div className="invalid-feedback col-sm-12">
                    {errors[track.id] && errors[track.id][fieldName] ? errors[track.id][fieldName] : ''}
                </div>
            </div>
    )
};

export default TrackFieldInput;