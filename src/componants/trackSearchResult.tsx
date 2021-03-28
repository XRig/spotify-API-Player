import React from 'react'

interface Props {
    track: {
        artist: string;
        title: string;
        uri: string;
        albumUrl: string;
    },
    key: string,
    chooseTrack: (track: any) => any;
}

function TrackSearchResult(props: Props) {
    const { track, chooseTrack } = props

    function handlePlayback () {
        chooseTrack(track)
    }

    return (
    
        <div className="d-flex m-2 align-items-center" style={{cursor:'pointer'}} onClick={handlePlayback}>
            <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.title}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult
