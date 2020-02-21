const { getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
 } = require('./db');

const checkIsValidModel = (req, res, next, model) => {
    const modelItems = getAllFromDatabase(model);
    if (modelItems) {
        req.modelType = model;
        req.modelItems = modelItems;
        next();
    } else {
        const err = new Error(`${model} is not a valid database model`)
        err.status = 404;
        next(err);
    }
}

const checkIsValidId = (req, res, next, id) => {
    const modelInstance = getFromDatabaseById(req.modelType, id);
    if (modelInstance) {
        // Won't need the whole list anymore
        req.modelItems = undefined;
        req.instanceId = id;
        req.modelInstance = modelInstance;
        next();
    } else {
        const err = new Error(`${id} is not a valid ${req.modelType} id`)
        err.status = 404;
        next(err);
    }
};

const create = (req, res, next) => {
    const instance = addToDatabase(req.modelType, req.body);
    if (instance) {
        req.modelInstance = instance;
        next();
    } else {
        const err = new Error(`The JSON sent in your request is not a valid ${req.modelType} instance`);
        err.status = 400;
        next(err);
    }
}

const update = (req, res, next) => {
    const instance = req.body;
    instance.id = `${req.instanceId}`;
    const updatedInstance = updateInstanceInDatabase(req.modelType, instance);
    if (updatedInstance) {
        req.modelInstance = updatedInstance;
        next();
    } else {
        const err = new Error(`The JSON sent in your request is not a valid ${req.modelType} instance`)
        err.status = 400;
        next(err);
    }
};

const remove = (req, res, next) => {
    if (deleteFromDatabasebyId(req.modelType, req.instanceId)) {
        next();
    } else {
        const err = new Error(`Couldn't find a ${req.modelType} with an id of ${req.instanceId} to delete`);
        err.status = 404;
        next(err);
    }
};

module.exports = {
    checkIsValidModel,
    checkIsValidId,
    create,
    update,
    remove
}
