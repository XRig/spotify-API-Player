import { useState, useEffect } from 'react'
import axios from 'axios'
interface Props {
    code: string
}

function UseAuth(props: Props) {
    const { code } = props
    const [accessToken, setAccessToken] = useState<string>()
    const [refreshToken, setRefreshToken] = useState<string>()
    const [expiresIn, setExpiresIn] = useState<number>()

    useEffect(() => {

        (async () => {
            try {
                const { data } = await axios.post('http://localhost:3080/login', { code })
                window.history.pushState({}, '', '/')
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                setExpiresIn(data.expiresIn)

            } catch (error) { window.location.href = '/' }
        })();
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return;
            const timeout = setInterval(async()=> {
                
                try {
                    const {data} = await axios.post('http://localhost:3080/refresh', { refreshToken })
                    window.history.pushState({}, '', '/')
                    setAccessToken(data.access_token)
                    setExpiresIn(data.expires_in)
                    
                } catch (error) { console.log(refreshToken) }
            },(expiresIn-60) *1000)
            return () => clearInterval(timeout)


    }, [refreshToken, expiresIn])
    return accessToken
}

export default UseAuth
