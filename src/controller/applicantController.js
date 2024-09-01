import AllJobs from "../model/allJobsData.js";



export const applyToJob = (req, res) => {
    const { applicantsId } = req.session.applicantsId;
    const { jobId } = req.params;

    const job = AllJobs.getJob(jobId);

    job.addApplicant(applicantsId);
}