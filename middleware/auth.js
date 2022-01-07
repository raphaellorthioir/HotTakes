const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1] /* récupération du token dans le header */
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); /* vérifie si le token correspond au token de la fonction login */
        const userId = decodedToken.userId; /* vérifie l'userId encodé */
        if(req.body.userId && req.body.userId !== userId ){
            throw 'invalid user ID';
        }else{
            next();
        }
    }
    catch (error){
        res.status(401).json({error: new Error(' unauthorized request')  })
    }
};