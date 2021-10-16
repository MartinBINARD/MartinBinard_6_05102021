const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res , next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject);
    // REMOVE STANDARD ID GENERATED BY MONGODB
    delete sauceObject._id;
    // ADD SCHEMA
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0
    });
    console.log(sauce);
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

exports.likeDislikeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((Sauce) =>{
            switch(req.body.like) {
                // Like
                case 1 :
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked:  req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Sauce liked !'}))
                        .catch(error => res.status(400).json({ error }));
                break;
                // Dislike
                case -1 :
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Sauce disliked !'}))
                        .catch(error => res.status(400).json({ error }));
                break;
                // Cancel like or dislike
                case 0 :
                    /* userId is already stored in UserDisliked*/
                    if(Sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull:{ usersLiked: req.body.userI} })
                            .then(() => res.status(200).json({ message: 'Sauce liked canceled !'}))
                            .catch(error => res.status(400).json({ error }));
                    } else if (Sauce.usersDisliked.includes(req.body.userId)) { /* userId is already stored iUserDisliked*/
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.boduserId } })
                            .then(() => res.status(200).json({ message: 'Sauce disliked canceled !'}))
                            .catch(error => res.status(400).json({ error }));
                    }
                break;
                default :
                    throw {
                        error: "Like / dislike function error !"
                    };
            };
        })
        .catch((error) => res.status(500).json({ error }));
};