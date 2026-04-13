import api from './api';
const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ROLE = "userRole";

export const login = async (data) => {
    try {    
        const response = await api.post("/Auth/Login", data);
        setAuth(response.data.accessToken, response.data.role, response.data.refreshToken);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const register = async (data) => {
    try {
        const response = await api.post('/Auth/Register', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ROLE);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}
export const setAuth = (token, role, refreshToken) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_ROLE, role);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const getRefreshToken = (REFRESH_TOKEN_KEY) => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserRole = () => {
    return localStorage.getItem(USER_ROLE);
}

export const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    try {
        const response = await api.post('/Auth/refresh-token', { refreshToken })
        setAuth(response.data.accessToken, response.data.role, response.data.refreshToken);
        return response;
    }catch(error){
        throw error.response ? error.response.data : error;
    }
}

export const isAuthenticated = () => {
    return !!localStorage.getItem(TOKEN_KEY);
};


export const emailConfirmation = async (data) => {
    try {
        const response = await api.post('/Auth/confirm-email', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const resendEmail = async (email)=>{
    try{
        const response = await api.post('/Auth/resend-email', email)
        return response.data;
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}