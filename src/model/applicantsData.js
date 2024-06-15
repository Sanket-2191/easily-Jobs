
class AllApplicants {

    static applicants = [];

    static getTotalApplicants = () => this.applicants.length;

    static addNewApplicant = (applicant) => {
        this.applicants.push(...this.applicants, applicant);
        return true;
    }
}