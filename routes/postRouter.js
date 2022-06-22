const express = require('express')
const router = express.Router()
const requireLogin  = require('../middleware/requireLogin')
const { Post } = require('../models/models')


router.post('/createpost',requireLogin,(req,res)=>{
    const { postName, postDescription, price, posted_by } = req.body 
    if(!postName || !postDescription || !price || !posted_by){
      return res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        postName,
        postDescription,
        price,
        posted_by:req.user.username
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({posted_by:req.user._id})
    .populate("posted_by","_id username")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router