import { api } from "./config/axiosConfig";

export const CommonService = {
    get: async function(endpoint, id){
        const { data } = await api().request({
            url: `/${endpoint}/${id}`,
            method: 'GET',
        });
        return data;
    },
    getAll: async function(endpoint){
        const { data } = await api().request({
            url: `/${endpoint}`,
            method: 'GET'
        });
        return data;
    },
    getAllAsOptions: async function(endpoint){
        const { data } = await api().request({
            url: `/${endpoint}/options`,
            method: 'GET'
        });
        return data;
    },
    getByProp: async function(endpoint, prop, value){
        const { data } = await api().request({
            url: `/${endpoint}/${prop}/${value}`,
            method: 'GET'
        });
        return data
    },
    create: async function(endpoint, load){
        const { data } = await api().request({
            url: `/${endpoint}`,
            method: 'POST',
            data: load
        });
        return data;
    },
    edit: async function(endpoint, id, data){
        const { status } = await api().request({
            url: `/${endpoint}/${id}`,
            method: 'PATCH',
            data: data
        });
        return status;
    },
    remove: async function(endpoint, id){
        const { status } = await api().request({
            url: `/${endpoint}/${id}`,
            method: 'DELETE'
        });
        return status;
    },
    restore: async function(endpoint, id){
        const { status } = await api().request({
            url: `/${endpoint}/restore/${id}`,
            method: 'PATCH'
        });
        return status;
    },
    download: async function(endpoint, selected, headers){
        const { data } = await api().request({
            url: `/${endpoint}/download`,
            method: 'POST',
            data: { ids: selected, headers },
            responseType: 'blob'
        });
        return data;
    },
    createWithFiles: async function(endpoint, form){
        const { data } = await api().request({
            url: `/${endpoint}`,
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            data: form
        });
        return data;
    },
    customRequest: async function(url, method, options = null){
        const { data } = await api().request({
            url,
            method,
            ...options
        });
        return data;
    },
    print: async function(endpoint, form){
        const { data } = await api().request({
            url: `/${endpoint}`,
            method: 'POST',
            responseType: 'blob',
            headers: {'Content-Type': 'multipart/form-data'},
            data: form
        });
        return data;
    }
}