import { Applicant } from "./applicantStructure.js";

export class AllApplicants {

    static #applicants = [];

    static emailsRegistered = {};

    static getAllApplicants = () => this.#applicants;

    static getTotalApplicants = () => this.#applicants.length;

    // static checkDupEmail = (email) => {
    //     if (this.emailsRegistered.email) return true;
    //     return false;
    // }
    static addNewApplicant = (applicant) => {

        // if (this.checkDupEmail(applicant.email)) {
        //     return false;
        // }

        this.#applicants.push(applicant);

        this.emailsRegistered[applicant.email] = true;
        return true;
    }

    static validateApplicant = ({ email, password }) => {
        console.log("resieved applicant for verif:", { email, password });

        const applicant = this.getApplicant(email);
        console.log(applicant);


        return applicant.validLoginInfo(email, password);
    }

    // can make finding the applicant easier by assigning an id........ 
    static getApplicant = (email) => {
        console.log("In applicant data model getapplicant recieved email/id:", email);

        const applicant = this.#applicants.find(app => {
            console.log("In applicant data model getapplicant:", { email: app.email, id: app.getId() });

            return app.email === email || app.getId() === email
        });
        console.log("In applicant data model getapplicant applicant found?:", applicant);

        return applicant;
    }
}

const user1 = new Applicant(1, "Alice", "alice@example.com", "password123", [0, 1, 2]);

// Instance 2
const user2 = new Applicant(2, "Bob", "bob@example.com", "securePass456", [1, 2, 3, 4]);

// Instance 3
const user3 = new Applicant(3, "Charlie", "charlie@example.com", "charliePwd789", [0, 2, 4]);

// Instance 4
const user4 = new Applicant(4, "Dana", "dana@example.com", "danaPass123", [3]);

// Instance 5
const user5 = new Applicant(5, "Eve", "eve@example.com", "eveSecure456", [0, 1, 3]);

AllApplicants.addNewApplicant(user1);
AllApplicants.addNewApplicant(user2);
AllApplicants.addNewApplicant(user3);
AllApplicants.addNewApplicant(user4);
AllApplicants.addNewApplicant(user5);

// console.log(AllApplicants.getAllApplicants());
