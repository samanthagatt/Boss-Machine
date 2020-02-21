const express = require('express');
const apiRouter = express.Router();
const { checkIsValidModel, checkIsValidId, create, update, remove } = require('./utils');

apiRouter.param('dbModel', checkIsValidModel);

apiRouter.get('/:dbModel', (req, res, next) => {
    res.send(req.modelItems);
});
apiRouter.post('/:dbModel', create, (req, res, next) => {
    res.status(201).send(req.modelInstance);
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
