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

export const sendInvitation = async (groupId, studentEmail) => {
    try {
        const response = await api.post(`/api/Groups/${groupId}/invitations`, studentEmail );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getGroupInvitations = async (id) => {
    try {
        const response = await api.get(`/api/Groups/${id}/invitations`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
export const getMyInvitations = async () => {
    try {
        const response = await api.get(`/api/Groups/my-invitations`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const acceptInvitation = async (invitationId) => {
    try {
        const response = await api.put(`/api/Groups/invitations/${invitationId}/accept`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const rejectInvitations = async (invitationId) => {
    try {
        const response = await api.put(`/api/Groups/invitations/${invitationId}/reject`);
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
