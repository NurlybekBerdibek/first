const express = require('express')
const router = express.Router()
const requireLogin  = require('../middleware/requireLogin')
const {Post, User} = require('../models/models')


router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({where: {_id:req.params.id}})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("posted_by","_id username")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports = router