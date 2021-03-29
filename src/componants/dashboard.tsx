import { track } from '../types'
import useAuth from '../hooks/useAuth'
import { Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './trackSearchResult'
import Player from './player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: 'c4e5378e4d7f4fb08bae2547e66d43ee'
})

interface Props {
    code: string
}

function Dashboard(props: Props) {
    const [search, setSearch] = useState<string>("")
    const [searchResults, setSearchResults] = useState<track[] | undefined>([])
    const [playingTrack, setPlayingTrack] = useState<any>()
    const [lyrics, setLyrics] = useState<any>()
    const { code } = props
    const accessToken = useAuth({ code })

    function chooseTrack(track: track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!playingTrack) return
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3080/lyrics', {
                    params: {
                        track: playingTrack.title,
                        artist: playingTrack.artist
                    }
                })
                setLyrics(data)
            } catch (error) {

            }

        })()
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    useEffect(() => {
        let cancel: boolean = false
        if (!search) return setSearchResults([])
        if (!accessToken) return
        (async () => {
            if (cancel) return;
            try {
                const result = await spotifyApi.searchTracks(search)

                let searchResultObject = result?.body?.tracks?.items?.map(track => {
                    const smallestAlbumArt = track?.album?.images?.reduce((smallest: any, image: any) => {
                        if (!image.height) return
                        if (!smallest.height) return image
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumArt.url
                    }
                })
                setSearchResults(searchResultObject)

            } catch (error) {

            }
        })();

        cancel = true
    }, [search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults?.map(track => {
                    return <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack} />
                })}

                <div className="text-center" style={{ whiteSpace: "pre" }}>
                    {lyrics}
                </div>


            </div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </Container>
    )
}

export default Dashboard
