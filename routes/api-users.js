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
  let email = req.body.email;

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
  let id = req.body.user;

  Users.findOne({ _id: id }).then((data) =>
 data ? res.json({"status":"sucsses","bought":data.itemsBought})
  : res.json({"status":"user id dose not match"})
  );
});

router.post("/users/Soled", (req, res, next) => {
  let id = req.body.user;

  Users.findOne({ _id: id }).then((data) =>
 data ? res.json({"status":"sucsses","soled":data.itemsSoled})
  : res.json({"status":"user id dose not match"})
  );
});

router.delete("/users/?:id", (req, res, next) => {
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

  Users.findByIdAndUpdate(id, { $set: { itemsBought: itemsBought } }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});




router.patch("/users/addSold/:id", (req, res) => {
  let id = req.params.id;
  let itemsSoled = req.body.itemsSoled;

  Users.findByIdAndUpdate(id, { $set: { itemsSoled: itemsSoled } }, { new: true }).then(
    (updatedUser) => {
      res.send("User updated by id through PATCH");
    }
  );
});









router.post(
  "/",
  async (req, res, next) => {
    const { body } = req;
    const result = UsersSchema.validate(body);

    const { value, error } = result;
    const valid = error == null;

    if (!valid) {
      res
        .status(422)
        .send()
        .json({
          message: "invalid reques",
          data: value,
          erorr: `this is your error ${error}`,
        });
    }
  },
  function (req, res, next) {}
);

module.exports = router;
