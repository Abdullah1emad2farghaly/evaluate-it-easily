import api from './api';

export const createUser = async (data) => {
    try {
        const response = await api.post(`/Users`, data); 
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await api.get(`/Users/${userId}`); 
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}
export const getAllUsers = async () => {
    try {
        const response = await api.get(`/Users`); 
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateUser = async(id, data)=>{
    try {
        const response = await api.put(`/Users/${id}`, data); 
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }

}

export const toggleActivate = async(id)=>{
    try {
        const response = await api.put(`/Users/${id}/toggle-active`); 
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}