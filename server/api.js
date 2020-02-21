const express = require('express');
const apiRouter = express.Router();
const { checkIsValidModel, handleDbModelParam } = require('./utils');

apiRouter.param('dbModel', checkIsValidModel);

apiRouter.use('/:dbModel', handleDbModelParam);

apiRouter.get('/:dbModel', (req, res, next) => {
    res.send(req.modelItems);
});

apiRouter.post('/:dbModel', (req, res, next) => {
    res.status(201).send(req.modelInstance);
});

module.exports = apiRouter;
