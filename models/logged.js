const mongoose=require('mongoose');


const LoggedSchema=mongoose.Schema({
    logged:{
        type:Boolean,
        required:true
    }
});
const Logged = mongoose.model('logged',LoggedSchema);
module.exports=Logged;