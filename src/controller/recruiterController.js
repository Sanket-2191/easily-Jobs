import AllJobs from "../model/allJobsData.js";
import { AllApplicants } from "../model/applicantsData.js";
import Job from "../model/jobStructure.js";
import { AllRecruiters } from "../model/recruiterData.js";

export const postedJobs = (req, res) => {
    const recruiter = req.session.recruiter;
    console.log("recruiterId posted jobs:", recruiter);
    if (recruiter) {

        const recruiterf = AllRecruiters.getRecruiter(req.session.recruiterId)

        console.log("Recruiter for all jobIds:(inside recruiter contr.)", recruiterf);

        // we get ids of jobs posted by any recruiter from getPostedJobs...
        const jobsPostedIds = recruiterf.getPostedJobs();

        // getting job objects from Job model.... 
        const jobs = jobsPostedIds.map(id => AllJobs.getJob(id))
        console.log(`Jobs posted by ${req.session.userId} (inside recruiter contr.) :`, jobs);

        res.render('postedJobs', { recruiter: recruiterf, jobs, loggedIn: req.session.loggedIn, userId: req.session.userid });
    }
}

export const listOfApplicants = (req, res) => {
    // get jobId from req params

    const recruiter = req.session.recruiter;
    console.log("recruiterId posted jobs:", recruiter);
    if (recruiter) {

        const jobId = req.params.jobId;
        const job = AllJobs.getAllJobs().find(job => job.id == jobId);
        console.log("Applicants needed for which job? (inside recruiter contr.) ", { job });

        // we get ids of applicants for given from getAllApplicants...
        const applicantIds = job.getAllApplicants();
        console.log("ApplicantIds for job: (inside recruiter contr.)", applicantIds);
        // getting applicant objects from applicant model.... 
        const applicants = applicantIds.map(id => AllApplicants.getApplicant(id))
        console.log("Applicants for job: (inside recruiter contr.)", applicants);


        res.render('applicants', { recruiter, applicants, loggedIn: req.session.loggedIn, userId: req.session.userid })
    }


}

export const editJob = (req, res) => {
    const recruiter = req.session.recruiter;
    const jobId = req.params.jobId;
    const job = AllJobs.getAllJobs().find(job => job.id == jobId);
    res.render('editJob.ejs', { recruiter, job, loggedIn: req.session.loggedIn, userId: req.session.userid });
}

// Update job route handler
export const updateJob = (req, res) => {
    const recruiter = req.session.recruiter;
    const jobId = req.params.jobId;

    console.log("Jobid from req.params to update:", jobId);

    const recruiterf = AllRecruiters.getRecruiter(req.session.recruiterId);

    if (!recruiterf) {
        return res.status(404).send('Recruiter not found');
    }

    console.log("Recruiter for all jobIds:", recruiterf);

    const jobsPostedIds = recruiterf.getPostedJobs() || [];
    console.log("JobIds from recruiter:", jobsPostedIds);

    const jobs = jobsPostedIds.map(id => AllJobs.getJob(id)).filter(Boolean); // Filter out undefined jobs
    console.log("Job objects from recruiter:", jobs);

    const job = jobs.find(j => j.id == jobId);
    console.log("Job object to be updated found?", job);

    if (job) {
        const { role, location, salary, requirements } = req.body;
        job.role = role || job.role;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.requirements = requirements ? requirements.split(',').map(req => req.trim()) : job.requirements;

        return res.render('postedJobs', {
            recruiter,
            emailId: req.session.userid,
            jobs,
            loggedIn: req.session.loggedIn,
            userId: req.session.userid
        });
    } else {
        return res.status(404).send('Job not found');
    }
};

export const addJobForm = (req, res) => {
    return res.render('addJobForm', {
        recruiter: {},
        emailId: req.session.userid,
        jobs: [],
        loggedIn: req.session.loggedIn,
        userId: req.session.userid
    })
}

export const addNewJob = (req, res) => {
    console.log("----------------------------------------------------------------------------------------------------");
    console.log("Start of addNewJob");


    const { role, requirements, location, companyName, salary } = req.body;
    const requirementsArray = requirements ? requirements.split(',').map(req => req.trim()) : [];

    // Check if there are any jobs, otherwise default to 1
    const allJobs = AllJobs.getAllJobs();
    const lastJobId = allJobs.length > 0 ? allJobs[allJobs.length - 1].id : 0;
    const newId = lastJobId + 1; // New ID should be the last job ID + 1

    const applicants = [];

    console.log("Data received to be used as newJob:", { newId, requirementsArray, role, salary, applicants, location, companyName });

    const newJob = new Job(newId, requirementsArray, role, salary, applicants, location, companyName);

    console.log("New job created with received data:", newJob);


    const recruiterf = AllRecruiters.getRecruiter(req.session.recruiterId);

    recruiterf.addPostedJobs(newId); // Adding new job ID to recruiter's posted jobs


    AllJobs.addNewJob(newJob); // Adding the new job to the job list

    console.log("All jobs after adding newJob to AllJobs model:", AllJobs.getAllJobs());


    console.log("Recruiter for all jobIds:(inside recruiter contr.)", recruiterf);

    // Get all jobs posted by the recruiter
    const jobsPostedIds = recruiterf.getPostedJobs();
    console.log("Jobid posted by recruiter:(inside recruiter contr.)", jobsPostedIds);
    const jobs = jobsPostedIds.map(id => {
        console.log("Iterating over jobId array", AllJobs.getJob(id));

        return AllJobs.getJob(id);
    }); // Get job objects for rendering

    console.log("All jobs after adding new posted job:", jobs);
    console.log("End of addNewJob");
    console.log("----------------------------------------------------------------------------------------------------");


    return res.render('postedJobs', {
        recruiter: recruiterf,
        emailId: req.session.userid,
        jobs,
        loggedIn: req.session.loggedIn,
        userId: req.session.userid
    });
};



// /:jobId

// const jobId=req.params.jobId;