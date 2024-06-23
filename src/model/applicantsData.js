
export class AllApplicants {

    static applicants = [];

    static emailsRegistered = {};

    static getTotalApplicants = () => this.applicants.length;

    // static checkDupEmail = (email) => {
    //     if (this.emailsRegistered.email) return true;
    //     return false;
    // }
    static addNewApplicant = (applicant) => {

        // if (this.checkDupEmail(applicant.email)) {
        //     return false;
        // }

        this.applicants.push(...this.applicants, applicant);

        this.emailsRegistered[applicant.email] = true;
        return true;
    }

    static validateApplicant = ({ email, password }) => {
        this.applicants.forEach(app => {
            if (app.email === email && app.password === password) {
                return true;
            }
        })

        return false;
    }

    // can make finding the applicant easier by assigning an id........
    static getApplicant = (email) => {
        return this.applicants.find(app => app.email === email);
    }
}