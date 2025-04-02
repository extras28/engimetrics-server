import gitlabInstance from "../instance.js";

const commits = {
    list: (params) => {
        const url = `/projects/${params.projectId}/repository/commits`;
        return gitlabInstance.get(url);
    },
    detail: (params) => {
        const url = `/projects/${params.projectId}/repository/commits/${params.branchName ?? params.sha}`;
        return gitlabInstance.get(url);
    },
    commitReference: (params) => {
        const url = `/projects/${params.projectId}/repository/commits/${params.sha}/refs`;
        return gitlabInstance.get(url, { params });
    },
    commitDiff: (params) => {
        const url = `/projects/${params.projectId}/repository/commits/${params.branchName ?? params.sha}/diff`;
        return gitlabInstance.get(url);
    },
};
export default commits;
