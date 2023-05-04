import api from "./config/axiosConfig";

export const AuthService = {
    login: async function(credentials){
        const { data, status } = await api().request({
            url: `/auth/login`,
            method: 'POST',
            data: credentials
        });
        return data;
    },
    logout: function(){
        localStorage.clear();
        return;
    },
    getRoutes: async function(){
        const { data } = await api().request({
            url: `/rutas`,
            method: 'GET',
        });
        return data;
    }
};