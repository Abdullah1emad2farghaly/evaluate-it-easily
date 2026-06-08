import api from "./api.jsx";

export const getHistoricalProjects = async () => {
  try {
    const response = await api.get("/api/HistoricalProjects");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/api/HistoricalProjects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const archiveProject = async (academicYear) => {
  try {
    const response = await api.post("/api/HistoricalProjects/archive", {
      academicYear,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
