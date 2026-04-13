import api from './api'

export const getNotifications = async ()=>{
    try {
        const response = await api.get("/api/Notifications");
        return response.data
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}       