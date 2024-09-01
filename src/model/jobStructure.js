
class Job {
    #applicantIds;
    constructor(id, requirements, role, salary, applicants, location, company) {

        this.id = id;
        this.requirements = requirements;
        this.role = role;
        this.salary = salary;
        this.#applicantIds = applicants || [];
        this.location = location;
        this.company = company;

    }

    getTotalApplicants = () => this.#applicantIds.length;

    getAllApplicants = () => this.#applicantIds;

    getRequirements = () => this.requirements;

    addApplicant = (id) => this.#applicantIds.push(id);
}


export default Job;