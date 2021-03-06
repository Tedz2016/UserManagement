var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User     = require('./../models/user');

var users =[
  {"id":1, "fName":"Hege", "lName":"Pege", "title":"Writer","sex":"Female","age":"20"},
  {"id":2, "fName":"Kim",  "lName":"Pim", "title":"Engineer","sex":"Male","age":"22" },
  {"id":3, "fName":"Sal",  "lName":"Smith", "title":"Teacher","sex":"Female","age":"24"},
  {"id":4, "fName":"Jack", "lName":"Jones", "title":"Architect","sex":"Male","age":"33" },
  {"id":5, "fName":"John", "lName":"Doe", "title":"Athlete","sex":"Female","age":"23" },
  {"id":6, "fName":"Peter","lName":"Pan", "title":"Cashier","sex":"male","age":"42" },
  {"id":7, "fName":"Ted", "lName":"Moby", "title":"Writer","sex":"Male","age":"20"},
  {"id":8, "fName":"John",  "lName":"Doe", "title":"Engineer","sex":"Male","age":"22" },
  {"id":9, "fName":"Rose",  "lName":"Lee", "title":"Teacher","sex":"Female","age":"36"},
  {"id":10, "fName":"Harrison", "lName":"Jones", "title":"Architect","sex":"Male","age":"33" },
  {"id":11, "fName":"Robin", "lName":"Wang", "title":"Athlete","sex":"Female","age":"23" },
  {"id":12, "fName":"Lucy","lName":"He", "title":"Cashier","sex":"male","age":"29" },
  {"id":13, "fName":"Jay", "lName":"Chou", "title":"Writer","sex":"Female","age":"19"},
  {"id":14, "fName":"Bob",  "lName":"Bobby", "title":"Engineer","sex":"Male","age":"62" },
  {"id":15, "fName":"Sim",  "lName":"Sam", "title":"Teacher","sex":"Female","age":"27"},
  {"id":16, "fName":"Zed", "lName":"Shawn", "title":"Architect","sex":"Male","age":"31" },
  {"id":17, "fName":"Lily", "lName":"Xu", "title":"Athlete","sex":"Female","age":"28" },
  {"id":18, "fName":"Owen","lName":"Zhang", "title":"Cashier","sex":"male","age":"47" }
 ];

/* GET users listing. */
router.get('/', function(req, res) {
    //res.json(users);
    User.find(function(err,Users) {
       if(err) res.send(err);
       else res.json(Users);
    });
});
//Create New User
router.post('/', function(req, res) {
   // users.push(req.body);
   // console.log(users);
   // res.status(201).send("User created successfully");
    var user = new User(req.body);
    user.save(function(err){
        if(err) res.send(err);
        else res.json({message: 'user created!'});
    });
});
//Update User
router.put('/:id', function(req, res) {
   User.findById(req.params.id, function(err, user) {
       if(err) res.send(err);
       user.fName = req.body.fName || user.fName;
       user.lName = req.body.lName || user.lName;
       user.title = req.body.title || user.title;
       user.sex = req.body.sex || user.sex;
       user.age = req.body.age || user.age;
       user.save(function(err) {
           if(err) res.send(err);
           res.json({message : 'User updated!'});
       })

   });
   /* var id = parseInt(req.params.id);
    var index;
    var hasId = false;
    if(!isNaN(id)) {
        for (index = 0; index < users.length; index++) {
            if (users[index].id === id) {
              //should change only specified attributes
                users[index] = req.body;
                console.log(users);
                hasId = true;
                res.status(200).send('User updated successfully');
            }
        }
        if (!hasId) res.status(400).send('User not found');
    }
    else res.status(400).send('Invalid user id');*/
});
//Delete user
router.delete('/:id', function(req, res) {
    User.remove({
        _id : req.params.id
    }, function(err, user) {
        if (err) res.send(err);
        res.json({message:"User deleted!"});
    });
});

//GET single user
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) res.send(err);
        res.json(user);
    });
});



module.exports = router;
