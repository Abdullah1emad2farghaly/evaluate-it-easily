import api from "./api";

export const makeDecision = async (proposalId, decisionType, feedbackComment) => {
    try {
        const response = await api.post(`/api/Decisions/${proposalId}`, {decisionType, feedbackComment});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}