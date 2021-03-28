import React from 'react'

interface Props {
    track:{artist: string;
        title: string;
        uri: string;
        albumUrl: string;
    },
    key: string
}

function TrackSearchResult(props: Props) {
    const {track} = props

    return (
        <div className="d-flex m-2 align-items-center">
            <img src={track.albumUrl} style={{height:'64px',width:'64px'}}/>
        </div>
    )
}

export default TrackSearchResult
