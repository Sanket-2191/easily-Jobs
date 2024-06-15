import allJobs from "./allJobsData.js";

class Applicant {
    constructor(name, email, password, jobsIds) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.jobsIds = jobsIds;
    }

    addAppliedJobs = (id) => {
        this.jobsIds.push(...this.jobsIds, id);
        return true;
    }
}