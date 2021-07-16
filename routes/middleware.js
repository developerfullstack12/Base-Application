const jwt = require('jsonwebtoken')

exports.authUser = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.replace('Bearer ', '').replace('bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (req.headers['lang']) {
                res.setLocale(req.headers['lang']);
            }
            //if(decoded.role==0){                
            return next();
            //}
        } catch (e) {
            console.log(e.message);
        }
    }
    return res.status(res.__("STATUS_UNAUTHORIZED")).json(res.__("UNAUTHORIZED"));

}

exports.commonHeader = (req, res, next) => {
    if (req.headers['lang']) {
        res.setLocale(req.headers['lang']);
    }
    return next();
}
exports.authAdmin = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.replace('Bearer ', '').replace('bearer ', '');
        try {
            if (req.headers['lang']) {
                res.setLocale(req.headers['lang']);
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role == 1) {
                return next();
            }
        } catch (e) {
            console.log(e.message);
        }

    }
    return res.status(res.__("STATUS_UNAUTHORIZED")).json(res.__("UNAUTHORIZED"));

}