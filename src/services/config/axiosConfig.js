import axios from "axios";

export const api = () => {
    return axios.create({
    baseURL: window.location.protocol === "https:"
        ? import.meta.env.VITE_SECURE_API_URL
        : import.meta.env.VITE_LOCAL_API_URL,
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`}
})};

/* const errorHandler = (error) => {
    const statusCode = error.response?.status;
    if(statusCode && statusCode !== 401){
        console.error(error)
    }
    return Promise.reject(error);
}

api().interceptors.request.use(undefined, (error) => {
    return errorHandler(error);
}); */