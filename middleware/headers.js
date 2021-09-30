module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    // res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, observe");
    // res.header("Access-Control-Max-Age", "3600");
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Expose-Headers", "Authorization");
    // res.header("Access-Control-Expose-Headers", "responseType");
    // res.header("Access-Control-Expose-Headers", "observe");
    next();
} 
