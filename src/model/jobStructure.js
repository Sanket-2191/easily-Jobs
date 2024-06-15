class Job {
    constructor(requirements, role, salary, applicants, location) {
        this.requirements = requirements;
        this.role = role;
        this.salary = salary;
        this.applicants = applicants;
        this.location = location;
    }

    getApplicants = () => this.applicants.length;

    getApplicantsDetail = () => {
        // go to applicants data and get all the applicants 
        // by comparing their id with the index number of current applicant.
        const applicantsOfJob = [];

        return applicantsOfJob;
    }

    getRequirements = () => {
        return this.requirements;
    }
}

export default Job;