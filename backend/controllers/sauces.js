const Sauce = require('../models/Sauce');

exports.createSauce = (req, res , next) => {
    // REMOVE STANDARD ID GENERATED BY MONGODB
    delete req.body._id;
    // ADD SCHEMA
    const sauce = new Sauce({
        ...req.body
    });
    // STORING TO MONGODB
    thing.save()
        .then(() => res.status(201).json({ message: 'Hot sauces added !'}))
        .catch(error => res.status(400).json({ error }));
};