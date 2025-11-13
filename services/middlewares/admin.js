const isAdmin = (req, res, next) => {
    if (req.user.isAdmin !== true) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }
    next();
};
module.exports = isAdmin;
