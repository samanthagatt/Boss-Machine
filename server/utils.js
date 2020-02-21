const { getAllFromDatabase, addToDatabase } = require('./db');

const checkIsValidModel = (req, res, next, model) => {
    const modelItems = getAllFromDatabase(model);
    if (modelItems) {
        req.modelType = model;
        req.modelItems = modelItems;
        next();
    } else {
        const err = new Error(`${model} is not a valid`)
        err.status = 404;
        next(err);
    }
}

const create = (req, res, next) => {
    const instance = addToDatabase(req.modelType, req.body);
    if (instance) {
        req.modelInstance = instance;
        next();
    } else {
        next(new Error(`The JSON sent in your request is not a valid ${req.modelType} type`));
    }
}

const handleDbModelParam = (req, res, next) => {
    switch (req.method) {
        case 'GET':
            next();
            return;
        case 'POST':
            create(req, res, next);
            return;
        default:
            const err = new Error(`HTTP method ${req.method} not implemented for ${req.path}`);
            err.status = 404;
            next(err);
    }
};

module.exports = {
    checkIsValidModel,
    handleDbModelParam
}
