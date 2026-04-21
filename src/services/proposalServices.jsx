import api from "./api";

export const createProposal = async (data) => {
    try {
        const response = await api.post("/api/Proposals", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getProposals = async () => {
    try {
        const response = await api.get("/api/Proposals");
        return response.data;
    }catch (error) {    
        throw error.response ? error.response.data : error;
    }
}

export const getMyProposal = async ()=>{
    try {
        const response = await api.get('/api/Proposals/my-proposal');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getProposalById = async (id) => {
    try {
        const response = await api.get(`/api/Proposals/${id}`);
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error;
    }
}

export const updateProposal = async (id, data) => {
    try {
        const response = await api.put(`/api/Proposals/${id}`, data);
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : error;
    }
}

export const makePreview = async (id) => {
    try {
        const response = await api.get(`/api/Proposals/${id}/download`, {responseType : "blob"});

        return response.data;
    } catch(error){
        throw error.response ? error.response.data : error;
    }
}


