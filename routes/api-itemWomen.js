const express = require("express");
const itemWomen = require("../models/itemsWomen");
const router = express.Router();


// most upvotes

function findBiggestVote(items)
{
  
  let big ={vote:items[0].upVotes.length,index:0}
  for(i=1;i<items.length;i++)
  if(items[i].upVotes.length>big.vote)
   big ={vote:items[i].upVotes.length,index:i}

  return big.index;
}

function orderUpvotes(items)
{
  let preSorted=[...items]
  
  let sorted=[];
  let bigIndex;
for(let i=0;i<items.length;i++)
{
  
  bigIndex= findBiggestVote(preSorted)
   sorted.push(preSorted[bigIndex])
   preSorted.splice(bigIndex, 1);

}
return sorted;
}



// high to low

function findBiggest(items)
{
  
  let big={bid:items[0].offers[items[0].offers.length-1].currentBid,index:0}
  for(i=1;i<items.length;i++)
  if(items[i].offers[items[i].offers.length-1].currentBid>big.bid)
  big={bid:items[i].offers[items[i].offers.length-1].currentBid,index:i}

  return big.index;
}

function orderHtoL(items)
{
  let preSorted=[...items]
  
  let sorted=[];
  let bigIndex;
for(let i=0;i<items.length;i++)
{
  
  bigIndex= findBiggest(preSorted)
   sorted.push(preSorted[bigIndex])
   preSorted.splice(bigIndex, 1);

}
return sorted;
}


// low to high

function findsmallest(items)
{
  
  let small={bid:items[0].offers[items[0].offers.length-1].currentBid,index:0}
  for(i=1;i<items.length;i++)
  if(items[i].offers[items[i].offers.length-1].currentBid<small.bid)
  small={bid:items[i].offers[items[i].offers.length-1].currentBid,index:i}

  return small.index;
}

function orderLtoH(items)
{
  let preSorted=[...items]
  
  let sorted=[];
  let smallIndex;
for(let i=0;i<items.length;i++)
{
  
  smallIndex=   findsmallest(preSorted)
   sorted.push(preSorted[smallIndex])
   preSorted.splice(smallIndex, 1);

}

return sorted;
}



// sort by search


function orderSearch(items,filter)
{

let sorted=items.filter(e=>e.description.includes(filter))
return sorted
}






router.get("/itemwomen/", (req, res, next) => {
  itemWomen.find({})
    .then((data) => res.json(data))
    .catch(next)
});


router.get("/itemwomen/?:id", (req, res, next) => {
  itemWomen.find({_id:req.params.id})
    .then((data) => res.json(data))
    .catch(next)
});


router.post("/itemwomem", (req, res, next) => {
  console.log("a")
  req.body 
    ? itemWomen.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.post("/itemwomen/highToLow", (req, res, next) => {
  req.body 
    ? itemWomen.find({})
        .then((data) => res.json( orderHtoL(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});


router.post("/itemwomen/lowToHigh", (req, res, next) => {
  req.body 
    ? itemWomen.find({})
        .then((data) => res.json(orderLtoH(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.post("/itemwomen/upVote", (req, res, next) => {

  req.body 
    ? itemWomen.find({})
        .then((data) => res.json(orderUpvotes(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});


router.post("/itemwomen/search", (req, res, next) => {
     const {filter}=req.body
  req.body 
    ? itemWomen.find({})
        .then((data) => res.json(orderSearch(data,filter)))
        .catch(next)
    : res.json({ error: "invalid input" });
});



router.delete("/itemwomen/?:id", (req, res, next) => {
  itemWomen.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});




router.patch('/itemwomen/:id/', (req, res) => {
  let id = req.params.id;
  let {offers,upVotes} = req.body
 
  

  itemWomen.findByIdAndUpdate(id, { $set: { offers: offers ,upVotes:upVotes} }, { new: true }).then((updatedUser) => {
    res.send('User updated by id through PATCH');
  });
});


module.exports = router;
