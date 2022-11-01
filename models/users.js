const mongoose=require('mongoose');


const UsersSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true
    },
    itemsSoled:
    {
        type:Array,
        required:true
    },

    itemsBought:
    {
        type:Array,
        required:true
    },
    
    isBought:Boolean,

    isSoled:Boolean
   
});


const Users = mongoose.model('users',UsersSchema);
module.exports=Users;
