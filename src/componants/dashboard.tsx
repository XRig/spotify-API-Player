import React from 'react'
import useAuth from '../hooks/useAuth'
import { Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './trackSearchResult'
const spotifyApi = new SpotifyWebApi({
    clientId: 'c4e5378e4d7f4fb08bae2547e66d43ee'
})

interface Props {
    code: string
}
interface track {artist: string;
    title: string;
    uri: string;
    albumUrl: string;
}
function Dashboard(props: Props) {
    const [search, setSearch] = useState<string>("")
    const [searchResults, setSearchResults] = useState<track[]|undefined>([])
    const { code } = props
    const accessToken = useAuth({ code })

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    useEffect(() => {
        let cancel:boolean = false
        if (!search) return setSearchResults([])
        if (!accessToken) return
        (async () => {
            if (cancel) return;
            try {
                const result = await spotifyApi.searchTracks(search)
                
            let searchResultObject = result?.body?.tracks?.items?.map(track => {
                    const smallestAlbumArt = track?.album?.images?.reduce((smallest:any,image:any)=>{
                        if (!image.height) return
                        if (!smallest.height) return image
                        if (image.height < smallest.height) return image
                        return smallest                   
                    },track.album.images[0])
                    
                    return {
                        artist: track.artists[0].name,
                        title:track.name,
                        uri:track.uri,
                        albumUrl:smallestAlbumArt.url
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
                  return  <TrackSearchResult track={track} key={track.uri}/>
                })}
            </div>
        </Container>
    )
}

export default Dashboard
