import api from "./api";

export const createGroup = async (data) => {
    try {
        const response = await api.post("/api/Groups", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getMyGroup = async () => {
    try {
        const response = await api.get("/api/Groups/my-group");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}


export const getGroups = async () => {
    try{
        const response = await api.get("/api/Groups");
        return response.data;
    } catch (error){
        throw error.response ? error.response.data : error;
    }
}

export const getGroupById = async (id) => {
    try {
        const response = await api.get(`/api/Groups/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const addMemberToGroup = async (groupId, studentEmail) => {
    try {
        const response = await api.post(`/api/Groups/${groupId}/members`, studentEmail );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const removeMemberFromGroup = async (groupId, studentID) => {
    try {
        const response = await api.delete(`/api/Groups/${groupId}/members/${studentID}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}


export const availableStudents = async () => {
    try {
        const response = await api.get(`/api/Groups/available-students`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
