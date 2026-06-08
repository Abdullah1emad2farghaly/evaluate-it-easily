import api from "./api";

export const getThreshold = async () => {
    try {
        const response = await api.get("/api/Settings/threshold");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const setThreshold = async (threshold) => {
    try {
        const response = await api.put("/api/Settings/threshold", { threshold });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
