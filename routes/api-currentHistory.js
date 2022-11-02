const express = require("express");
const itemMen = require("../models/itemsMen");
const itemkids = require("../models/itemsKids");
const itemWomen = require("../models/itemsWomen");
const router = express.Router();
var _MEN = [];
var _WOMEN = [];
var _KIDS = [];
var _COMBINED = [];

function finditemsWithIDBuyer(data, id) {
  let temp = data;
  let sorted = [];
  let repeat = false;
  for (let i = 0; i < temp.length; i++) {
    for (let j = 1; j < temp[i].offers.length; j++) {
      if (temp[i].offers[j].bidderID == id && !repeat) {
        sorted.push(temp[i]);
        repeat = true;
        j = temp[i].offers.length - 1;
      }
    }
    repeat = false;
  }
  return sorted;
}

function findSmallDate(items) {
  let small = { Date: items[0].dueDate, index: 0 };
  for (i = 1; i < items.length; i++)
    if (items[i].dueDate < small.Date)
      small = { Date: items[i].dueDate, index: i };

  return small.index;
}

function orderDownDates(items) {
  let preSorted = [...items];

  let sorted = [];
  let smallIndex;
  for (let i = 0; i < items.length; i++) {
    smallIndex = findSmallDate(preSorted);
    sorted.push(preSorted[smallIndex]);
    preSorted.splice(smallIndex, 1);
  }
  return [...sorted];
}



//seller

function finditemsWithIDSeller(data, id) {
  let temp = data;
  let sorted = [];
  let repeat = false;
  for (let i = 0; i < temp.length; i++) {
    for (let j = 1; j < temp[i].offers.length; j++) {
      if (temp[i].offers[j].bidderID == id && !repeat) {
        sorted.push(temp[i]);
        repeat = true;
        j = temp[i].offers.length - 1;
      }
    }
    repeat = false;
  }
  return sorted;
}



//chart sell

function chartSell(items) {
    let preSorted = [...items];
  
    let sorted = [];
    let earnings = 0;
    obj = {};
    for (let i = 0; i < items.length; i++) {
      earnings += items[i].offers[items[i].offers.length - 1].currentBid;
    }
  

    return earnings;
  }



  function chartEarnings(items) {
   
    
    return items.length;
  }
  

router.post("/currentBid", (req, res, next) => {
  const { id } = req.body;
  itemMen
    .find({})
    .then((data) => {
      _MEN = finditemsWithIDBuyer(data, id, "men");
    })
    .then(
      itemkids
        .find({})
        .then((data) => (_KIDS = finditemsWithIDBuyer(data, id, "kids")))
    )
    .then(
      itemWomen
        .find({})
        .then((data) => (_WOMEN = finditemsWithIDBuyer(data, id, "women")))
    )
    .then(() => {
      _COMBINED = _MEN.concat(_KIDS, _WOMEN);
      res.json(orderDownDates(_COMBINED));
    })
    .catch(next);
});

router.post("/currentSell", async (req, res, next) => {
  const { id } = req.body;
  await itemMen
    .find({ SellerID: id })
    .then((data) => {
      _MEN = data;
    })
    .then(
     await itemkids.find({ SellerID: id }).then((data) => {
        _KIDS = data;
      })
    )
    .then(
     await itemWomen.find({ SellerID: id }).then((data) => {
        _WOMEN = data;
      })
    )
    .then(() => {
      _COMBINED = _MEN.concat(_KIDS, _WOMEN);
      res.json(orderDownDates(_COMBINED));
    })
    .catch(next);
});

router.post("/currentBid/chartEarnings", async (req, res, next) => {
  const { id } = req.body;
  await itemMen
    .find({})
    .then((data) => {
      _MEN = chartEarnings(finditemsWithIDBuyer(data, id, "men"));
    }).then( await itemkids
        .find({})
        .then(
          (data) =>
            {_KIDS = chartEarnings(finditemsWithIDBuyer(data, id, "kids"))}
        )).then( await itemWomen
            .find({})
            .then(
              (data) =>
                (_WOMEN = chartEarnings(finditemsWithIDBuyer(data, id, "women")))
            ))
    
   
    
   
    
    
    .then(() => {
      res.json([
        { earnings: _KIDS, section: "Kids" },
        { earnings: _WOMEN, section: "Women" },
        { earnings: _MEN, section: "Men" },
      ]);
    })
    .catch(next)
});





router.post("/totalBids", async (req, res, next) => {
    const { id } = req.body;
 await   itemMen
      .find({})
      .then((data) => {
        _MEN = chartEarnings(finditemsWithIDBuyer(data, id, "men"))
      }).then( await itemkids
        .find({})
        .then(
          (data) =>
            {_KIDS = chartEarnings(finditemsWithIDBuyer(data, id, "kids"))}
        )).then( await itemWomen
          .find({})
          .then(
            (data) =>
              _WOMEN = chartEarnings(finditemsWithIDBuyer(data, id, "women"))
          ))

      
    
      
      .then(() => {
        res.json(
         {total:_MEN+_KIDS+_WOMEN}
        );
      })
      .catch(next)
  });
  




  router.post("/currentSell/chart/get", async (req, res, next) => {
    const { id } = req.body;
    
    itemMen
    .find({})
    .then((data) => {
      _MEN = chartSell(data);
   ;kid() })
    
      const kid = async ()=>{ await itemkids
        .find({})
        .then(
          (data) =>
            {_KIDS = chartSell(data)}
        ).then(women())}
    
   
   const women= async()=>  { itemWomen
        .find({})
        .then(
          (data) =>
            _WOMEN = chartSell(data)
        )
    
    .then(() => {
       res.json(
       {total:_MEN+_KIDS+_WOMEN}
      );
    })
    .catch(next);}
  });



router.post("/chart", async (req, res, next) => {
  const { id } = req.body;
  await itemMen.find({ SellerID: id }).then((data) => {
    _MEN = chartSell(data);
  }).catch(next);
  await itemkids.find({ SellerID: id }).then((data) => {
    _KIDS = chartSell(data);
  }).catch(next);
  await itemWomen
    .find({ SellerID: id })
    .then((data) => {
      _WOMEN = chartSell(data);
    })
    .then(() => {
     
        res.json({
          total: _KIDS + _WOMEN + _MEN,
          arr: [
            { value: _KIDS, id: "Kids" },
            { value: _WOMEN, id: "Women" },
            { value: _MEN, id: "Men" },
          ],
        });
    })
    .catch(next);
});

module.exports = router;
