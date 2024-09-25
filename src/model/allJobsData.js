import Job from "./jobStructure.js";

class AllJobs {

    static #jobs = [

    ];

    static totalJobCount = 0;

    static getAllJobs = () => {
        return this.#jobs;
    }
    static addNewJob = (job) => {
        this.#jobs.push(job);
        this.totalJobCount++;
        return true;
    }

    static getJob = (id) => {
        return this.#jobs.find(j => j.id == id);
    }

}

const jobData = [
    {
        id: 0,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Frontend developer",
        salary: "6-10 lpa",
        applicantIds: [0, 3, 4],
        location: "Pune"
    },
    {
        id: 1,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Frontend developer",
        salary: "6-10 lpa",
        applicantIds: [1, 2],
        location: "Pune"
    },
    {
        id: 2,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Fullstack developer",
        salary: "6-10 lpa",
        applicantIds: [1, 4],
        location: "Pune"
    },
    {
        id: 3,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Web developer",
        salary: "6-10 lpa",
        applicantIds: [2, 3, 4],
        location: "Pune"
    },
    {
        id: 5,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Data Analytics",
        salary: "6-10 lpa",
        applicantIds: [0, 3],
        location: "Pune"
    },
    {
        id: 6,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Frontend developer",
        salary: "6-10 lpa",
        applicantIds: [2, 4],
        location: "Pune"
    },
    {
        id: 7,
        requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
        role: "Backend developer",
        salary: "6-10 lpa",
        applicantIds: [1, 2, 3, 4],
        location: "Pune"
    }
];

jobData.forEach(data => {
    const job = new Job(data.id, data.requirements, data.role, data.salary, data.applicantIds, data.location, data.company);
    AllJobs.addNewJob(job);
});

export default AllJobs;

// {
//     id: 0,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Frontend developer",
//     salary: "6-10 lpa",
//     applicantIds: [0, 3, 4],
//     location: "Pune"
// }, {
//     id: 1,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Frontend developer",
//     salary: "6-10 lpa",
//     applicantIds: [1, 2],
//     location: "Pune"
// }, {
//     id: 2,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Fullstack developer",
//     salary: "6-10 lpa",
//     applicantIds: [1, 4],
//     location: "Pune"
// }, {
//     id: 3,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "web developer",
//     salary: "6-10 lpa",
//     applicantIds: [2, 3, 4],
//     location: "Pune"
// }, {
//     id: 5,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Data Analytics",
//     salary: "6-10 lpa",
//     applicantIds: [0, 3],
//     location: "Pune"
// }, {
//     id: 6,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Frontend developer",
//     salary: "6-10 lpa",
//     applicants: [2, 4],
//     location: "Pune"
// }, {
//     id: 7,
//     requirements: ['ReactJS', 'HTML/CSS', 'JavaScript', 'Jquery'],
//     role: "Backend developer",
//     salary: "6-10 lpa",
//     applicantIds: [1, 2, 3, 4],
//     location: "Pune"
// }