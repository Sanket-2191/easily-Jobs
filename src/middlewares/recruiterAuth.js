// import session from "express-session"

export const recruiterAuth = (req, res, next) => {
    if (req.session.loggedIn && req.session.isRecruiter) {
        next();
    }
    else {
        res.render('login', { loggedIn: req.session.loggedIn, msg: "Login as a recruiter to continue", success: false });
    }
}