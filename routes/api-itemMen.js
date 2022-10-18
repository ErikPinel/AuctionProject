const express = require("express");
const itemMen = require("../models/itemsMen");
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






router.get("/itemmen/", (req, res, next) => {
  itemMen.find({})
    .then((data) => res.json(data))
    .catch(next)
});


router.get("/itemmen/?:id", (req, res, next) => {
  itemMen.find({_id:req.params.id})
    .then((data) => res.json(data))
    .catch(next)
});


router.post("/itemmen", (req, res, next) => {
  req.body 
    ? itemMen.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.post("/itemmen/highToLow", (req, res, next) => {
  req.body 
    ? itemMen.find({})
        .then((data) => res.json( orderHtoL(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});


router.post("/itemmen/lowToHigh", (req, res, next) => {
  req.body 
    ? itemMen.find({})
        .then((data) => res.json(orderLtoH(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.post("/itemmen/upVote", (req, res, next) => {
 
  req.body 
    ? itemMen.find({})
        .then((data) => res.json(orderUpvotes(data)))
        .catch(next)
    : res.json({ error: "invalid input" });
});


router.post("/itemmen/search", (req, res, next) => {
     const {filter}=req.body
  req.body 
    ? itemMen.find({})
        .then((data) => res.json(orderSearch(data,filter)))
        .catch(next)
    : res.json({ error: "invalid input" });
});



router.delete("/itemmen/?:id", (req, res, next) => {
  itemMen.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});




router.patch('/itemmen/:id/', (req, res) => {
  let id = req.params.id;
  let {offers,upVotes} = req.body
 
  

  itemMen.findByIdAndUpdate(id, { $set: { offers: offers ,upVotes:upVotes} }, { new: true }).then((updatedUser) => {
    res.send('User updated by id through PATCH');
  });
});


module.exports = router;
