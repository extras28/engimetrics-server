import branches from "./branches/index.js";
import commits from "./commits/index.js";
import projects from "./projects/index.js";

const gitlabService = {
    branches,
    projects,
    commits,
};

export default gitlabService;
