
// import session from "express-session"

export const applicantsAuth = (req, res, next) => {
    if (req.session.loggedIn && req.session.applicantsId) {
        next();
    }
    else {
        res.render('login', { loggedIn: session.loggedIn, msg: "Login as a recruiter to continue" });
    }
}