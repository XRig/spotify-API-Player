import React from 'react'
import {track} from '../types'

interface Props {
    track: track,
    key: string,
    chooseTrack: (track: track) => void;
}

function TrackSearchResult(props: Props) {
    const { track, chooseTrack } = props

    function handlePlayback () {
        chooseTrack(track)
    }

    return (
    
        <div className="d-flex m-2 align-items-center" style={{cursor:'pointer'}} onClick={handlePlayback}>
            <img src={track.albumUrl} style={{ height: '64px', width: '64px' }}alt="Album Art" />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult
