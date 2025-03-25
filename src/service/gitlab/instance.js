import axios from "axios";
import queryString from "query-string";

const tag = "[GITLAB-INSTANCE]";

const gitlabInstance = axios.create({
    baseURL: process.env.GITLAB_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 20000,
    paramsSerializer: (params) => queryString.stringify(params),
});

gitlabInstance.interceptors.request.use(async (config) => {
    console.log(`${tag} - ${config.baseURL}${config.url}, ${config.method}`);

    const token = process.env.GITLAB_TOKEN;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

gitlabInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default gitlabInstance;
