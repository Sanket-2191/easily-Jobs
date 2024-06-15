import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from 'path'
import session from "express-session";
import cookieParser from "cookie-parser";
import multer from "multer";
// import body, { validationResults } from 'express-validator'

import { getMainPage } from "./src/controller/centralControl.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.set('layout', 'layout/layout.ejs')

app.get('/', getMainPage);


export default app;