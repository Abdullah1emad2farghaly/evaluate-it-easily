import api from "./api";


export const SupervisorAssignments = async (data) => {
    try {
        const response = await api.post("/api/SupervisorAssignments", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}