import AllJobs from "../model/allJobsData.js";


export const listOfApplicants = (req, res) => {
    // get jobId from req params

    const jobId = req.params.jobId;
    const job = AllJobs.getAllJobs().find(job => job.id == jobId);

    const applicants = job.getAllApplicants();


}

export const editJob = (req, res) => {
    const jobId = req.params.jobId;
    const job = AllJobs.getAllJobs().find(job => job.id == jobId);
    res.render('editJob.ejs', { job });
}

// Update job route handler
export const updateJob = (req, res) => {

    const jobId = req.params.jobId;

    const job = AllJobs.getAllJobs().find(job => job.id == jobId);
    if (job) {
        job.role = req.body.role || job.role;
        job.location = req.body.location || job.location;
        job.salary = req.body.salary || job.salary;
        job.requirements = req.body.requirements.split(',').map(req => req.trim()) || job.requirements;
        res.redirect('/jobs');
    } else {
        res.status(404).send('Job not found');
    }
};

// /:jobId

// const jobId=req.params.jobId;