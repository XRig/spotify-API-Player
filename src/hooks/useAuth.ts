import {useState,useEffect} from 'react'
import axios from 'axios'
interface Props {
    code:string
}

function UseAuth(props: Props) {
    const {code} = props
    // const [accessToken,setAccessToken] = useState()
    // const [refreshToken,setrefreshToken] = useState()
    // const [expiresIn,setexpiresIn] = useState()

useEffect(() => {
    console.log(code)
     axios.post('http://localhost:3080/login',{
        code
    }).then(res => console.log(res.data)).catch(() =>{window.location.href = '/'})
},[code])
}

export default UseAuth
