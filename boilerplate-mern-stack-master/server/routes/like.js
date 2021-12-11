const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
  
    let variable = {}
    
    if(req.body.videoId) {
        variable = { videoId : req.body.videoId }

    } else  {
        variable = {commentId : req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});

router.post("/getDislikes", (req, res) => {
  
    let variable = {}
    
    if(req.body.videoId) {
        variable = { videoId : req.body.videoId }
    } else  {
        variable = {commentId : req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })

});


router.post("/upLike", (req, res) => {
  
    let variable = {}
    
    if(req.body.videoId) {
        variable = { videoId : req.body.videoId, useId: req.body.useId }
    } else  {
        variable = {commentId : req.body.commentId, userId: req.body.userId }
    }

    // 1. Like Collection 에 클릭 정보를 넣는다 

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.json({success: false , err})

    // 2. 만약에 Dislike 이 이미 클릭이 되어 있다면, 그것을 Dislike 를 1 줄여준다
    Dislike.findOneAndDelete(variable)    
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success:true })
        })
    })
});

router.post("/unLike", (req, res) => {
  
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, useId: req.body.useId  }
    } else {
        variable = { commentId: req.body.commentId, useId: req.body.useId }
    }


    Like.findOneAndDelete(variable) 
        .exec((err, result) => {
            if(err) return res.status(400).json({success:false, err})
            res.status(200).json({ success: ture })
        })

});

router.post("/unDislike", (req, res) => {
  
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId , useId: req.body.useId }
    } else {
        variable = { commentId: req.body.commentId, useId: req.body.useId }
    }

    Like.findOneAndDelete(variable) 
        .exec((err, result) => {
            if(err) return res.status(400).json({success:false, err})
            res.status(200).json({ success: ture })
        })

});

router.post("/upDislike", (req, res) => {
  
    let variable = {}
    
    if(req.body.videoId) {
        variable = { videoId : req.body.videoId , useId: req.body.useId }
    } else  {
        variable = {commentId : req.body.commentId , useId: req.body.useId }
    }

    // 1. Dislike Collection 에 클릭 정보를 넣는다 

    const disLike = new Dislike(variable)

    disLike.save((err, disLikeResult) => {
        if(err) return res.json({success: false , err})

    // 2. 만약에 Dislike 이 이미 클릭이 되어 있다면, 그것을 Dislike 를 1 줄여준다
    Like.findOneAndDelete(variable)    
        .exec((err, likeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success:true })
        })
    })
});


module.exports = router;
