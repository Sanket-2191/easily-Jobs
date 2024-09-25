import nodemailer from 'nodemailer'
import session from 'express-session';


import AllJobs from "../model/allJobsData.js";
import { AllApplicants } from "../model/applicantsData.js";
import { Applicant } from "../model/applicantStructure.js";
import { AllRecruiters } from "../model/recruiterData.js";
import { Recruiter } from "../model/recruiterStructure.js";



const sendMail = (data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj' // It's a good practice to store sensitive data securely
        }
    });

    // Set up email data
    let mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: data.email,
        text: data.textMsg,
        subject: data.subject,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Success: Email sent to ${userMail}`);
        }
    });
}

export const mainPage = (req, res) => {
    const jobs = AllJobs.getAllJobs();
    res.render('main', { recruiter: req.session.recruiter, jobs, loggedIn: req.session.loggedIn, userId: req.session.userid })
}

export const jobsPage = (req, res) => {
    const jobs = AllJobs.getAllJobs();

    if (req.body && req.body.roleReq) {
        const roleReq = req.body.roleReq.toLowerCase(); // Get roleReq from request body
        const filtered = jobs.filter(job => job.role.toLowerCase().indexOf(roleReq) !== -1);
        return res.render('jobs.ejs', { recruiter: req.session.recruiter, jobs: filtered, loggedIn: req.session.loggedIn, userId: req.session.userid });
    }
    console.log("allJobs Rendering");
    res.render('jobs.ejs', { recruiter: req.session.recruiter, jobs, loggedIn: req.session.loggedIn, userId: req.session.userid })
}

export const signupPage = (req, res) => {
    return res.render('signup', {
        recruiter: req.session.recruiter,
        loggedIn: req.session.loggedIn, errors: null, userId: req.session.userid
    });
}

export const handleSignup = (req, res) => {
    const { name, email, password, userType } = req.body;

    console.log("In handleSignup:", { name, email, password, userType });

    if (userType === 'jobSeeker') {
        // Get all applicants
        const allApplicants = AllApplicants.getAllApplicants();
        // Assign new ID based on the last applicant's ID
        const id = allApplicants.length > 0 ? allApplicants[allApplicants.length - 1].id + 1 : 1;

        const jobsIds = [];
        const newApplicant = new Applicant(id, name, email, password, jobsIds);
        AllApplicants.addNewApplicant(newApplicant);

        const textMsg = `
        Hi ${name}!
        
        Thanks for choosing easily.com. Explore various job opportunities on our website.`;
        const subject = "Welcome to easily.com";

        sendMail({ textMsg, email, name, subject });

    } else if (userType === 'recruiter') {
        // Get all recruiters
        const allRecruiters = AllRecruiters.getAllRecruiters();
        // Assign new ID based on the last recruiter's ID
        const id = allRecruiters.length > 0 ? allRecruiters[allRecruiters.length - 1].id + 1 : 1;

        const jobsIds = [];
        const recruiter = new Recruiter(id, name, email, password, jobsIds);
        AllRecruiters.addNewRecruiter(recruiter);

        const textMsg = `
        Hi ${name}!
        
        Your UserId is: ${id}
        
        This id is used to verify your identity and is required to login as a recruiter. Don't share it with anyone else.
        
        This email was sent automatically, please don't reply to it.`;
        const subject = "Welcome to easily.com";

        sendMail({ textMsg, email, name, subject });
    }

    res.render('login', {
        recruiter: req.session.recruiter,
        loggedIn: req.session.loggedIn,
        msg: `Signup as ${name} is successful.`,
        success: true,
        userId: req.session.userid
    });
}


export const loginPage = (req, res) => {
    res.render('login', { recruiter: req.session.recruiter, loggedIn: req.session.loggedIn, msg: null, userId: req.session.userid })
}

export const handleLogin = (req, res) => {
    console.log("In handleLogin:", req.session);

    const { isRecruiter, email, password, userType } = req.body;

    let isAuth = false;
    if (isRecruiter) {
        const id = req.body.recruiterId;
        console.log({ id, email, password }, "sent for validation.");
        isAuth = AllRecruiters.validateRecruiter({ id, email, password });

    } else {
        isAuth = AllApplicants.validateApplicant({ email, password });
    }

    if (isAuth) {
        req.session.loggedIn = true;
        req.session.isRecruiter = isRecruiter;
        req.session.userid = email;


        console.log("whats is session:", req.session);


        if (isRecruiter) {
            const id = req.body.recruiterId;
            req.session.recruiterId = req.body.recruiterId;
            const recruiter = AllRecruiters.getRecruiter(id);
            req.session.recruiter = recruiter;
            req.session.name = recruiter.name;
            const postedJobIds = recruiter.getPostedJobs();
            const jobs = [];
            postedJobIds.forEach(id => jobs.push(AllJobs.getJob(id)));
            res.render('main', {
                recruiter: req.session.recruiter, jobs,
                loggedIn: req.session.loggedIn, userId: req.session.userid
            });
        }
        else {
            const jobs = AllJobs.getAllJobs();
            res.render('main', {
                recruiter: req.session.recruiter, jobs, loggedIn: req.session.loggedIn,
                userId: req.session.userid
            })
        }

    } else {
        res.render('login', {
            recruiter: req.session.recruiter, loggedIn: req.session.loggedIn,
            msg: "Unable to Login check your Credentials..", success: false, userId: req.session.userid
        })
    }
}

export const logout = (req, res) => {
    req.session.loggedIn = false;
    req.session.recruiter = null;
    res.render('main', {
        recruiter: req.session.recruiter, jobs: [], loggedIn: req.session.loggedIn,
        userId: req.session.userid
    })

}

// [1, 2, 3, 4].forEach(NUM => console.log(NUM);)/