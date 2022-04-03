import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.API_URL || '/api',
    headers: {
        'content-type': 'application/json',
        'cache': false,
        'contentType': false,
        'processData': false,
    },
    timeout:25000,
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use(async (response) => {
    return response.data;
}, (error) => {
    console.log("Network fall: ",error.message);
    return {
        code: 408, 
        status:false,
        message:"Network fall." + (error.message || ''),
    }
})

export default axiosClient
