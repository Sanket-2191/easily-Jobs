export const getMainPage = (req, res) => {
    res.render('main', { loggedIn: true })
}