import axios from 'axios'
const API_URL = "http://localhost:3080"

export const requestAccessToken = async(code:string) => {
    return await axios.post(`${API_URL}/login`, { code })
    
}

export const refreshAccessToken = async(refreshToken:string) => {
    return await axios.post(`${API_URL}/refresh`, { 
        refreshToken })
}

export const getLyrics = async (track:string, artist:string) => {
    return await axios.get(`${API_URL}/lyrics`, {
        params: {track,artist}
    })
}