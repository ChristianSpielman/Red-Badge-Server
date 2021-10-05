module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, observe");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.header("Access-Control-Expose-Headers", "responseType");
    res.header("Access-Control-Expose-Headers", "observe");
    next();
}