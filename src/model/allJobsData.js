import Job from "./jobStructure.js";


class allJobs {
    static jobs = []

    static totalJobCount = 0;

    static addNewJob = (job) => {
        this.jobs.push(...this.jobs, job);
        return true;
    }
}


export default allJobs;