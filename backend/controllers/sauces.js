const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.likeSauce = (req, res, next) => {
    // TO FILL UP
};

exports.createSauce = (req, res , next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // REMOVE STANDARD ID GENERATED BY MONGODB
    delete sauceObject._id;
    // ADD SCHEMA
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // STORING TO MONGODB
    sauce.save()
        .then(() => res.status(201).json({ message: 'Hot sauces added !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
       {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       } : { ...req.body };
    // compare to find the one to update
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Sauce modified !'}))
       .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename =sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce deleted !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};