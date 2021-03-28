import React from 'react'
import useAuth from '../hooks/useAuth'

interface Props {
    code:string
}

function Dashboard(props: Props) {
    
    const {code} = props
    const accessToken = useAuth({code})

    return (
        <div>{code}</div>
    )
}

export default Dashboard
