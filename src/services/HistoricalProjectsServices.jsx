import api from './api.jsx';

export const getHistoricalProjects = async (page, pageSize) => {
    try {
        const response = await api.get(`/api/HistoricalProjects?Page=${page}&PageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}


export const getProjectById = async (id) => {
    try {
        const response = await api.get(`/api/HistoricalProjects/${id}`);
        return response.data;
    } catch (error) {   
        throw error.response ? error.response.data : error;
    }   
}