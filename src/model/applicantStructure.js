import allJobs from "./allJobsData.js";

export class Applicant {
    #password;
    #appliedJobIds;
    #id;
    constructor(id, name, email, password, jobIds) {
        this.#id = id;
        this.name = name;
        this.email = email;
        this.#password = password;
        this.#appliedJobIds = jobIds;
    }

    #addAppliedJobs = (id) => {
        this.#appliedJobIds.push(...this.#appliedJobIds, id);
        return true;
    }
    getAppliedJobs = () => {
        return this.#appliedJobIds;
    }
    validLoginInfo = (email, password) => {
        console.log("executed validation on:", email, password);
        console.log("executed validation on:", this.email, this.#password);
        return this.email === email && this.#password === password;
    }
}