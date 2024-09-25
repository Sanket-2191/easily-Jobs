export class Recruiter {
    #password;
    #id;
    #postedJobIds;

    constructor(id, name, email, password, postedJobIds, phone) {
        this.#id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.#password = password;
        this.#postedJobIds = postedJobIds;
    }

    addPostedJobs = (id) => {
        this.#postedJobIds.push(id);
        return true;
    }

    getPostedJobs = () => {
        return this.#postedJobIds;
    }

    validLoginInfo = (email, password) => {
        // console.log("executed validation on:", email, password);
        // console.log("executed validation on:", this.email, this.#password);
        return this.email === email && this.#password === password;
    }
}