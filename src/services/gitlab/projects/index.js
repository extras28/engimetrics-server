import gitlabInstance from '../instance.js';

const projects = {
    list: (params) => {
        const url = '/projects';
        return gitlabInstance.get(url, { params });
    },
    projectById: (params) => {
        const url = `/projects/${params.projectId}`;
        return gitlabInstance.get(url);
    },
    projectsByName: (params) => {
        const url = `/projects`;
        return gitlabInstance.get(url, { params });
    },
    userInProject: (params) => {
        const url = `/projects/${params.projectId}/users`;
        return gitlabInstance.get(url);
    },
    memberInProject: (params) => {
        const url = `/projects/${params.projectId}/members/all`;
        return gitlabInstance.get(url);
    },
    languages: (params) => {
        const url = `/projects/${params.projectId}/languages`;
        return gitlabInstance.get(url);
    },
};

export default projects;
