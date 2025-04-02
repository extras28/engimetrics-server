import gitlabInstance from "../instance.js";

const branches = {
    list: (params) => {
        const url = `/projects/${params.projectId}/repository/branches`;
        return gitlabInstance.get(url);
    },
    detail: (params) => {
        const url = `/projects/${params.projectId}/repository/branches/${params.branchName}`;
        return gitlabInstance.get(url);
    },
    create: (params) => {
        const url = `/projects/${params.projectId}/repository/branches`;
        return gitlabInstance.post(url, params);
    },
    delete: (params) => {
        const url = `/projects/${params.projectId}/repository/branches/${params.branchName}`;
        return gitlabInstance.delete(url);
    },
    merge: (params) => {
        const url = `/projects/${params.projectId}/repository/merged_branches`;
        return gitlabInstance.delete(url);
    },
    protectedBranches: (params) => {
        const url = `/projects/${params.projectId}/protected_branches`;
        return gitlabInstance.delete(url);
    },
    protectedOrWildcardProtectedBranches: (params) => {
        const url = `/projects/${params.projectId}/protected_branches/${params.branchNameOrWildCard}`;
        return gitlabInstance.get(url);
    },
    createProtectedBranches: (params) => {
        const url = `/projects/${params.projectId}/protected_branches`;
        return gitlabInstance.post(url, params);
    },
    updateProtectedBranches: (params) => {
        const url = `/projects/${params.projectId}/protected_branches/<branch_name>`;
        return gitlabInstance.patch(url, params);
    },
    unprotectedBranches: (params) => {
        const url = `/projects/${params.projectId}/protected_branches/${params.branchNameOrWildCard}`;
        return gitlabInstance.delete(url);
    },
};

export default branches;
