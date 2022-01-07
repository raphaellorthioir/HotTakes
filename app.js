const express = require('express'); // import du package express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path= require('path') // donne accés aux chemins du système de fichier
const app= express();
module.exports= app; // export de la constante pour y accéder depuis les autres fichiers du serveur node
const userRoutes =require('./routes/user');
const saucesRoutes = require('./routes/sauces');

mongoose.connect('mongodb+srv://LaStrad:Comedia19912020@cluster0.4ihik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());// permet de mettre toutes les requêtes en format json

app.use((req, res, next) => {// permet d'attribuer un middleware à une route, ici toutes les routes
    res.setHeader('Access-Control-Allow-Origin', '*'); // * donne l'accés à tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// ajouter les heades aux requ^tes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // authorise les méthodes
    next();
  });

  app.use(bodyParser.json())
  app.use('/images',express.static(path.join(__dirname, 'images')))// apès une requ^tes vers images , on utilise static pour servir le dossier image, on définit //la route avec path.join en indiquant le nom du dossier
  app.use('/api/auth',userRoutes);
  app.use('/api/sauces',saucesRoutes);