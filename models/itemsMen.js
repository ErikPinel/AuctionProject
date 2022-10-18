const mongoose=require('mongoose');


const ItemMenSchema=mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    SellerID:{
        type:String,
        required:true
    },
    offers:{
        type:Array,
        required:true
    },
    dueDate:{
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    upVotes:{
        type:Array,
        required:true
    },
    section:{
        type:String,
        required:true
    }
    
  
});


const ItemMen = mongoose.model('itemmen',ItemMenSchema);
module.exports=ItemMen;