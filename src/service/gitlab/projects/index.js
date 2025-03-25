import gitlabInstance from "../instance.js";

const projects = {
    projects: (params) => {
        const url = "/projects";
        return gitlabInstance.get(url);
    },
};

export default projects;
