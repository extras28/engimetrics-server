import gitlabInstance from "../instance.js";

const branches = {
    branches: (params) => {
        const url = `/projects/${params.projectId}/repository/branches`;
        return gitlabInstance.get(url);
    },
    branch: (params) => {
        const url = `/projects/${params.projectId}/repository/branches/${params.branchName}`;
        return gitlabInstance.get(url);
    },
};

export default branches;
