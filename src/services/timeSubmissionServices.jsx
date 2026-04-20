import api from "./api"


export const AllPeriods = async ()=>{
    try {
        const response = await api.get("/api/SubmissionPeriods");
        return response.data
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}


export const CreactPeriod = async (data)=>{
    try {
        const response = await api.post("/api/SubmissionPeriods", data);
        return response.data
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}

export const UpdatePeriod = async (id, data)=>{
    try {
        const response = await api.put(`/api/SubmissionPeriods/${id}`, data);
        return response.data
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}


export const ToggleActive = async (id)=>{
    try {
        const response = await api.put(`/api/SubmissionPeriods/${id}/toggle-active`);
        return response.data;
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}

