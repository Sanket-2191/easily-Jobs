import { Recruiter } from "./recruiterStructure.js";

export class AllRecruiters {

    static #recruiters = [];

    static getTotalRecruiters = () => this.#recruiters.length;

    static addNewRecruiter = (recruiter) => {
        this.#recruiters.push(recruiter);
        return true;
    }

    static getRecruiter = (id) => {
        return this.#recruiters[id];
    }

    static validateRecruiter = ({ id, email, password }) => {
        console.log({ id, email, password }, "recieved for validation.");
        console.log("executed validation :", email);
        console.log(this.#recruiters[id]);
        const currRecruiter = this.#recruiters[id];
        if (currRecruiter.validLoginInfo(email, password)) {
            return true;
        }

        return false;
    }
}

const recruiter = new Recruiter(0, "Rohit Chavhan", "rohit@gmail.com", "rohit123", [2, 3]);
AllRecruiters.addNewRecruiter(recruiter);