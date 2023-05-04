import axios from "axios";

const api = () => {
    return axios.create({
    baseURL: window.location.protocol === "https:"
        ? import.meta.env.VITE_SECURE_API_URL
        : import.meta.env.VITE_LOCAL_API_URL,
    withCredentials: true
})};

api().interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const statusCode = error.response?.status;
        if(statusCode && statusCode === 401){
            console.error(error);
            /* await axios.get(/refresh), { withCredentials: true }) */
        }else{
            console.error(error);
            return Promise.reject(error);
        }
    }
);

export default api;