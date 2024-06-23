// npm install tailwindcss postcss autoprefixer postcss-cli 

import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from 'path'
import session from "express-session";
import cookieParser from "cookie-parser";
import multer from "multer";
import { body, validationResult } from 'express-validator'

// import 'animate.css';

import { mainPage, jobsPage, signupPage, handleSignup, loginPage, handleLogin } from "./src/controller/centralControl.js";
import { signupValidation } from "./src/middlewares/authentication.js";

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

app.get('/', mainPage);
app.get('/jobs', jobsPage);
app.post('/jobs', jobsPage);

app.get('/signup', signupPage);
app.post('/signup', signupValidation, handleSignup);  //signupValidation,

app.get('/login', loginPage);
app.post('/login', handleLogin)
// https://css-tricks.com/almanac/

export default app;