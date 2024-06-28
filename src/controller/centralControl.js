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
    res.render('main', { loggedIn: session.loggedIn })
}

export const jobsPage = (req, res) => {
    const jobs = AllJobs.getAllJobs();

    if (req.body && req.body.roleReq) {
        const roleReq = req.body.roleReq.toLowerCase(); // Get roleReq from request body
        const filtered = jobs.filter(job => job.role.toLowerCase().indexOf(roleReq) !== -1);
        return res.render('jobs.ejs', { jobs: filtered, loggedIn: req.session.loggedIn });
    }
    console.log("allJobs Rendering");
    res.render('jobs.ejs', { jobs, loggedIn: req.session.loggedIn })
}

export const signupPage = (req, res) => {
    return res.render('signup', { loggedIn: req.session.loggedIn, errors: null });
}

export const handleSignup = (req, res) => {

    const { name, email, password, userType } = req.body;

    if (userType === 'jobSeeker') {
        let id = AllApplicants.getTotalApplicants();

        const jobsIds = [];

        const newApplicant = new Applicant(id, name, email, password, jobsIds);

        AllApplicants.addNewApplicant(newApplicant);
        const textMsg = `
        Hi ${name}!
        
        Thanks for choosing easily.com. Explore various job opportunities on our website.`;

        const subject = "Welcome to easily.com";

        sendMail({ textMsg, email, name, subject });

    } else {

        let id = AllRecruiters.getTotalRecruiters();
        const jobsIds = [];
        const recruiter = new Recruiter(id, name, email, password, jobsIds);

        AllRecruiters.addNewRecruiter(recruiter);
        const textMsg = `
        Hi s${name}!
        
        Your UserId is: ${id}
        
        This id is used to verify your identity and required to login as a recruiter. Don''t share it with anyone else.
        
        This email was sent automatically, please don''t reply to it.`;

        const subject = "Welcome to easily.com";

        sendMail({ textMsg, email, name, subject });
    }
    res.render('login', { loggedIn: true, msg: `Recruiter Signup as ${name} is successful.` })

}

export const loginPage = (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn, msg: null })
}

export const handleLogin = (req, res) => {
    const { isRecruiter, email, password, userType } = req.body;


    let isAuth = false;
    if (isRecruiter) {
        const id = req.body.recruiterId;
        res.cookie('recruiterId', id);
        console.log({ id, email, password }, "sent for validation.");
        isAuth = AllRecruiters.validateRecruiter({ id, email, password });

    } else {
        isAuth = AllApplicants.validateApplicant({ email, password });
    }

    if (isAuth) {
        req.session.loggedIn = true;
        req.session.isRecruiter = isRecruiter;
        req.session.userid = email;

        if (isRecruiter) {
            const id = req.body.recruiterId;
            const recruiter = AllRecruiters.getRecruiter(id);
            const postedJobIds = recruiter.getPostedJobs();
            const jobs = [];
            postedJobIds.forEach(id => jobs.push(AllJobs.getJob(id)));
            res.render('postedJobs', { recruiter, id, jobs, loggedIn: req.session.loggedIn, userId: req.session.userId });
        }
        else {
            const jobs = AllJobs.getAllJobs();
            res.render('jobs', { jobs, loggedIn: req.session.loggedIn, userId: req.session.userId })
        }

    } else {
        res.render('login', { loggedIn: req.session.loggedIn, msg: "Unable to Login check your Credentials..", success: false, userId: null })
    }
}

