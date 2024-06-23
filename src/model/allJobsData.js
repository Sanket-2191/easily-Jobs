import Job from "./jobStructure.js";



class AllJobs {

    static #jobs = [
        {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Frontend developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Frontend developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Fullstack developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "web developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Data Analytics",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Frontend developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }, {
            requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
            role: "Backend developer",
            salary: "6-10 lpa",
            applicants: ['a1', 'a2'],
            location: "Pune"
        }
    ];

    static totalJobCount = 0;

    static getAllJobs = () => {
        return this.#jobs;
    }
    static addNewJob = (job) => {
        this.#jobs.push(...this.#jobs, job);
        return true;
    }

    static getJob = (id) => {
        return this.#jobs[id];
    }
}


export default AllJobs;