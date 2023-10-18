
import axios from 'axios';
// const axios = require('axios');
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    url: BASE_URL,
    params: {
        maxResults:50
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchFromApi = async(url) =>{
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`, options);
        return data
    } catch (error) {
        console.log('error')
    }
}
export const jsonApi = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json()
    return data
}