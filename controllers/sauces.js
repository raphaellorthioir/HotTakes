const {updateOne, findOne}= require ('../models/sauces')
const Sauce = require('../models/sauces');
const { path, request } = require('../app');

exports.createSauce = (req, res, next) =>{

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
       
        ... sauceObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
    .catch(error => res.status(400).json({error}));
};
exports.updateSauce = (req,res, next)=>{

  if (req.body.userId !== req.auth.userId) { 
      res.status(400).json({
      error: new Error('Unauthorized request!')
    });}
    
    const sauceObject = req.file ? // opérateur ternaire pour savoir si req.file existe
    {
        ...JSON.parse(req.body.sauce), //on récupére la chaîne de caractère
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`// on modifie l'Url
     } : {...req.body }; // si le fichier n'existe pas on reprend juste le corp de la requête sans changement de fichier image
  
    Sauce.updateOne({_id: req.params.id }, { ...sauceObject, _id: req.params.id})// en paramètre : filter pour retrouver la sauce concernée, ensuite update pour mettre les modifications à appliquer toujours en précisant que l'id qui se trouve en paramètre soit toujours celui de l'id donné par mongoDB
    
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
  
};
exports.getAllSauces= (req,res,next)=>{

    Sauce.find()
    .then(sauce =>res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
}

exports.getOneSauce = (req, res, next)=>{

    Sauce.findOne({_id: req.params.id}) /* on compare l'id de l'objet à l'id qui est envoyé par le frontend */
    .then(sauce =>res.status(200).json(sauce)) /* on renvoit un satus 200 pour indiquer le succés et on envoie la réponse en JSON */
    .catch(error => res.status(400).json({error}));/* on envoit error en JSON avec un statut 400 */
}

exports.deleteSauce = (req,res, next)=>{

    Sauce.findOne({ _id: req.params.id })
    .then(
        (sauce) => {
          if (!sauce) {
            res.status(404).json({
              error: new Error('No such Thing!')
            });
          }
          if (sauce.userId !== req.auth.userId) { 
            res.status(400).json({
              error: new Error('Unauthorized request!')
            });
          }
        })

    Sauce.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'Sauce supprimée'}))
    .catch(error => res.status(400).json({error}));

    
}

exports.likeSauce = (req,res, next)=>{
    
    Sauce.findOne({_id: req.params.id})
    .then ((sauce)=> {
        if(req.body.like == 1){

            if(!sauce.usersLiked.includes(req.body.userId)){
                sauce.likes ++;
                sauce.usersLiked.push(req.body.userId)
            }
           
            Sauce.updateOne({_id: req.params.id}, sauce)
            .then(() => res.status(200).json({ message: 'Sauce likée!'}))
            .catch(error => res.status(400).json({ error }));
        }
       
        if(req.body.like == 0){
            
            if(sauce.usersDisliked.includes(req.body.userId)){
                sauce.dislikes --
                sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId),1)
            }
            if(sauce.usersLiked.includes(req.body.userId)){
                sauce.likes --
                sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId),1)
            }
            Sauce.updateOne({_id: req.params.id}, sauce)
            .then(() => res.status(200).json({ message: 'Sauce neutre!'}))
            .catch(error => res.status(400).json({ error }));
          }
         
          if(req.body.like == -1){
            if(!sauce.usersDisliked.includes(req.body.userId)){
              sauce.dislikes ++;
              sauce.usersDisliked.push(req.body.userId)
            }
              Sauce.updateOne({_id: req.params.id}, sauce)
              .then(() => res.status(200).json({ message: 'Sauce dislikée!'}))
              .catch(error => res.status(400).json({ error }));
          }
    })
 
    
}

