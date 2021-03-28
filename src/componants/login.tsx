import React from 'react'


interface Props {}

function Login(props: Props) {

    const {} = props
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=c4e5378e4d7f4fb08bae2547e66d43ee&redirect_uri=http://localhost:3000&response_type=code&scope=streaming%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-email%20user-read-private%20user-library-read"


    return (

             <a className="btn btn-success btn-lg" href={AUTH_URL}>
                 Login with Spotify
             </a>
    )
}

export default Login