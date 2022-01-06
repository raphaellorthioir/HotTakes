const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true}
});
userSchema.plugin(uniqueValidator);
/* exportation du modèle */
/*mongoose.model('nom du model', modèle créé) */
module.exports= mongoose.model('User', userSchema);