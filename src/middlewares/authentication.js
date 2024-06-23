import { body, validationResult } from "express-validator"


export const signupValidation = async (req, res, next) => {
    const rules = [
        body('name').isLength({ min: 3 }).withMessage('Name Should be more that 2 words.').trim(),
        body('password').isLength({ min: 6 }).withMessage('Password should be atleast 6 letters.'),
        body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
        body('userType').notEmpty().withMessage('Must specify the userType.')
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const allerrors = validationResult(req);
    const errors = allerrors.array();
    console.log(errors);
    if (!allerrors.isEmpty()) {
        return res.status(400).render('signup', { loggedIn: false, errors });
    }

    next();
}
