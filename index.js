// npm install tailwindcss postcss autoprefixer postcss-cli 

import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from 'path'
import session from "express-session";
import cookieParser from "cookie-parser";
import multer from "multer";
import { body, validationResult } from 'express-validator'

// import 'animate.css';

import { mainPage, jobsPage, signupPage, handleSignup, loginPage, handleLogin, logout } from "./src/controller/centralControl.js";
import { signupValidation } from "./src/middlewares/authentication.js";
import { listOfApplicants, editJob, updateJob, postedJobs, addNewJob, addJobForm } from "./src/controller/recruiterController.js";
import { recruiterAuth } from "./src/middlewares/recruiterAuth.js";
import { applyToJob } from "./src/controller/applicantController.js";
import { applicantsAuth } from "./src/middlewares/applicantsAuth.js";

const app = express();

app.use(session({
    secret: "MYNAMEISSANKET",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.set('layout', 'layout/layout.ejs')

// app.set(express.static(path.resolve("./public")))

// landing page.....
app.get('/', mainPage);

// list of jobs available.........
app.get('/jobs', jobsPage);

app.post('/jobs', jobsPage);

app.get('/signup', signupPage);
app.post('/signup', signupValidation, handleSignup);  //signupValidation,

app.get('/login', loginPage);
app.post('/login', handleLogin);

app.get('/logout', logout)

app.post('/:jobId/apply', applicantsAuth, applyToJob)

// getting jobs posted by recruiter 
app.get('/postedJobs', recruiterAuth, postedJobs);
// get form for adding new job
app.get('/addJobForm', recruiterAuth, addJobForm);
// Add new job from data from the form....*: 
app.post('/addJob', recruiterAuth, addNewJob)
// getting recruiters list of applicants and the page to edit existing jobs.
app.get('/applicants/:jobId', recruiterAuth, listOfApplicants);
app.get('/edit/:jobId', recruiterAuth, editJob);

app.post('/edit/:jobId', recruiterAuth, updateJob)
// https://css-tricks.com/almanac/

export default app;