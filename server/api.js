const express = require('express');
const apiRouter = express.Router();
const { checkIsValidModel, create, removeAll, checkIsValidId, update, remove } = require('./utils');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.param('dbModel', checkIsValidModel);

apiRouter.get('/:dbModel', (req, res, next) => {
    res.send(req.modelItems);
});
apiRouter.post('/:dbModel', checkMillionDollarIdea, create, (req, res, next) => {
    res.status(201).send(req.modelInstance);
});
apiRouter.delete('/:dbModel', removeAll, (req, res, next) => {
    res.status(204).send(req.emptyArr);
});

apiRouter.param('modelId', checkIsValidId);

apiRouter.get('/:dbModel/:modelId', (req, res, next) => {
    res.send(req.modelInstance);
});
apiRouter.put('/:dbModel/:modelId', update, (req, res, next) => {
    res.send(req.modelInstance);
});
apiRouter.delete('/:dbModel/:modelId', remove, (req, res, next) => {
    res.status(204).send();
});

module.exports = apiRouter;
