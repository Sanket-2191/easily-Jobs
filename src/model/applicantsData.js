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

        this.#applicants.push(...this.#applicants, applicant);

        this.emailsRegistered[applicant.email] = true;
        return true;
    }

    static validateApplicant = ({ email, password }) => {
        this.#applicants.forEach(app => {
            if (app.email === email && app.password === password) {
                return true;
            }
        })

        return false;
    }

    // can make finding the applicant easier by assigning an id........
    static getApplicant = (email) => {
        return this.#applicants.find(app => app.email === email);
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
