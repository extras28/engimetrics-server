import gitlabInstance from "../instance.js";

const groups = {
    list: () => {
        const url = "/groups";
        return gitlabInstance.get(url);
    },
    detail: (params) => {
        const url = `/groups/${params.groupId}`;
        return gitlabInstance.get(url);
    },
    getGroupByName: (params) => {
        const url = `/groups`;
        return gitlabInstance.get(url, { params });
    },
    create: (params) => {
        const url = `/groups/<group_id>?name=<group_name>&path=<group_path>`;
        return gitlabInstance.post(url);
    },
    delete: (params) => {
        const url = `/groups/${params.groupId}`;
        return gitlabInstance.delete(url);
    },
    getSubgroups: (params) => {
        const url = `/groups/<group_id>/subgroups`;
        return gitlabInstance.get(url);
    },
    getDescendantGroups: (params) => {
        const url = `/groups/<group_id>/descendant_groups`;
        return gitlabInstance.get(url);
    },
    getGroupProject: (params) => {
        const url = `groups/<group_id>/projects`;
        return gitlabInstance.get(url);
    },
};

export default groups;
