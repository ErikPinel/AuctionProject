const express = require("express");
const Users = require("../models/users");
const router = express.Router();
const UsersSchema = require("../middleWare/userSchema");
const { message } = require("../middleWare/userSchema");

function encrypt(id,email)
{
  let encrypted="";
  let code;
  


  for(let i=0;i<email.length/3;i++)
  {
    idArr=id.split("")
    for(let j=0;j<id.length;j++)
    {
      idArr.map((e,index)=>{ String.fromCharCode(id.charCodeAt(0)+email.length+30)=='@'? idArr[j]=String.fromCharCode(id.charCodeAt(0)+email.length+30):""})

    }
    
  

  }
  idArr.join("")
console.log(idArr)
const encrypt=idArr;
  return encrypt;

}




function decrypt(id,email)
{
  idArr=id.split("")
 
  for(let i=0;i<email.length;i++)
  {
    
    for(let j=0;j<id.length;j++)
    {
     
      console.log(String.fromCharCode(id.charCodeAt(j)))
      idArr.map((e,index)=>{idArr[j]=String.fromCharCode( id.charCodeAt(j)-email.length+30)})
    }
    
  

  }
  idArr.join("")
  console.log("idArr")
console.log(idArr)
const decrypt=idArr;
  return decrypt;

}





function totalSpent(items)
{

let spentMen=0;
let spentWomen=0;
let spentKids=0;



for(let i=0; i<items.length;i++)
{
  if(items[i].section=="Men-section")
   { spentMen+=items[i].offers[items[i].offers.length-1].currentBid}
    else if(items[i].section=="Women-section")
    {spentWomen+=items[i].offers[items[i].offers.length-1].currentBid}

    else
    {spentKids+=items[i].offers[items[i].offers.length-1].currentBid}



}

console.log("spentKids:"+spentKids+"-  spentWomen:  "+spentWomen+"   spentMen:"+spentMen)
allSpent ={spentMen,spentWomen,spentKids}

return allSpent;
}




function totalRevanue(items)
{

let revanueMen=0;
let revanueWomen=0;
let revanueKids=0;



for(let i=0; i<items.length;i++)
{
  if(items[i].section=="Men-section")
   { revanueMen+=items[i].offers[items[i].offers.length-1].currentBid}
    else if(items[i].section=="Women-section")
    {revanueWomen+=items[i].offers[items[i].offers.length-1].currentBid}

    else
    {revanueKids+=items[i].offers[items[i].offers.length-1].currentBid}



}

console.log("revanueKids:"+revanueKids+"-  revanueWomen:  "+revanueWomen+"   revanueMen:"+revanueMen)
allRevanues ={revanueMen,revanueWomen,revanueKids}

return allRevanues;
}







router.get("/users", (req, res, next) => {
  
  Users.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/users/?:id", (req, res, next) => {
  Users.find({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/users/register", (req, res, next) => {
  console.log("sds***********************************************************d")
  let email = req.body.email;
 console.log(req.body.phone)
  Users.findOne({ email: email }).then((data) =>
    data
      ? res.json("email alredy exist")
      : Users.create(req.body)
          .then((data) => res.json(data._id))
          .catch(next)
  );
});

router.post("/users/login", (req, res, next) => {
  console.log("s")
  
  const {email,password} = req.body;
  Users.findOne({ email: email,password:password }).then((data) =>
    data
      ? res.json({"status":"logged","user":data})
      : res.json({"status":"email or password dose not match"})
  );
});

router.post("/users/logged", (req, res, next) => {
  let id = req.body.user;
 

  Users.findOne({ _id: id }).then((data) =>
 data ? res.json({"status":"logged","user":data})
  : res.json({"status":"user id dose not match"})
  );
});

router.post("/users/forgotPassword", (req, res, next) => {
  console.log("A")
  let email = req.body.email;

  Users.findOne({ email: email }).then((data) =>
 data ? res.json({"status":"logged","user":data.password})
  : res.json({"status":"user id dose not match"})
  );
});



router.post("/users/Bought", (req, res, next) => {
  const { id } = req.body;
  let allRevanues;
  Users.findOne({ _id: id }).then((data) =>{allSpent=totalSpent(data.itemsBought),
 data ? res.json({"status":"sucsses","revanue":   [
  { value:allSpent.spentKids, id: "Kids" },
  { value:allSpent.spentWomen, id: "Women" },
  { value: allSpent.spentMen, id: "Men" },
],"TotalItemsBought":data.itemsBought.length})

  : res.json({"status":"user id dose not match","bought":null})
 } );
});

router.post("/users/Soled", (req, res, next) => {
  const { id } = req.body;
  let allRevanues;
  console.log("sssss")
  Users.findOne({ _id: id }).then((data) =>{allRevanues=totalRevanue(data.itemsSoled),
 data ? res.json({"status":"sucsses",revanue:[
  { value:allRevanues.revanueKids, id: "Kids" },
  { value:allRevanues.revanueWomen, id: "Women" },
  { value: allRevanues.revanueMen, id: "Men" },
],"TotalItemsSoled":data.itemsSoled.length})

  : res.json({"status":"user id dose not match","bought":null})
 } );
});

router.delete("/users/?:id", (req, res, next) => {
  console.log("req.params.id" )
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.patch("/users/:id", (req, res) => {
  let id = req.params.id;
  let newName = req.body.name;

  Users.findByIdAndUpdate(id, { $set: { name: newName } }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});

router.patch("/users/addBought/:id", (req, res) => {
  let id = req.params.id;
  let itemsBought = req.body.itemsBought;

  Users.findByIdAndUpdate(id, { $set: { itemsBought: itemsBought,isBought:true } }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});




router.patch("/users/addSold/:id", (req, res) => {
  let id = req.params.id;
  let itemsSoled = req.body.itemsSoled;
console.log(id)
  Users.findByIdAndUpdate(id, { $set: { itemsSoled: itemsSoled,isSoled:true} }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});

router.patch("/users/removeIsSoled/:id", (req, res) => {
  let id = req.params.id;
  Users.findByIdAndUpdate(id, { $set: {isSoled:false} }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});

router.patch("/users/removeIsBought/:id", (req, res) => {
  let id = req.params.id;
  Users.findByIdAndUpdate(id, { $set: {isBought:false} }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});











router.post("/users/getBought", (req, res, next) => {
  const { id } = req.body;
  Users.findOne({ _id: id }).then((data) =>{
 data ? res.json({"status":"sucsses","items":data.itemsBought })

  : res.json({"status":"user id dose not match","bought":null})
 } );
});



router.post("/users/getSoled", (req, res, next) => {
  const { id } = req.body;
  Users.findOne({ _id: id }).then((data) =>{
 data ? res.json({"status":"sucsses","items":data.itemsSoled })

  : res.json({"status":"user id dose not match","bought":null})
 } );
});








// router.post(
//   "/",
//   async (req, res, next) => {
//     const { body } = req;
//     const result = UsersSchema.validate(body);

//     const { value, error } = result;
//     const valid = error == null;

//     if (!valid) {
//       res
//         .status(422)
//         .send()
//         .json({
//           message: "invalid reques",
//           data: value,
//           erorr: `this is your error ${error}`,
//         });
//     }
//   },
//   function (req, res, next) {}
// );

module.exports = router;
