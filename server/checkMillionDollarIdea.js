const checkMillionDollarIdea = (req, res, next) => {
    if (req.modelType !== 'ideas' || req.body.numWeeks * req.body.weeklyRevenue >= 1000000) {
        next();
    } else {
        const err = new Error('That idea isn\'t worth a million dollars!');
        err.status = 400;
        res.status(err.status).send(err.message);
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
