import api from "./api";

export const createEvaluation = async (proposalId) => {
    try {
        const response = await api.post(`/api/Evaluations/${proposalId}`)
        return response.data;
    } catch(error) {
        throw error.response ? error.response.data : error;
    }
}

export const getEvaluateProposal = async (proposalId) => {
    try{
        const response = await api.get(`/api/Evaluations/${proposalId}`);
        return response.data;
    } catch(error) {
        throw error.response ? error.response.data : error;
    }
}

export const getEvaluatedProjects = async ()=>{
    try{
        const response = await api.get(`/api/Evaluations`);
        return response.data;
    } catch(error) {
        throw error.response ? error.response.data : error;
    }
}