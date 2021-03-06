import React from 'react'
import {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

interface Props {
    accessToken?: string | null,
    trackUri: string
}

function Player(props: Props) {
    const [play, setPlay] = useState<boolean>(false)
    const { accessToken, trackUri } = props

    useEffect(() => setPlay(true),[trackUri])
    if (!accessToken) return <div>No Token </div>
    return (<div> {trackUri}
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state =>{
                if (!state.isPlaying) setPlay(false)}}
            uris={trackUri ? [trackUri] : []}
            play={play}
            />
            </div>
            
    )
}

export default Player
