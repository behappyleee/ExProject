const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg =require('fluent-ffmpeg');

const { Comment } = require('../models/Comment');
const { default: Subscribe } = require('../../client/src/components/views/NavBar/Sections/Subscribe');

//=================================
//             Comment
//=================================

router.post("/saveComment", auth, (req, res) => {
  
    const comment = new Comment(req.body)
    comment.save((err , comment) => {
        if(err) return res.json({ success: false, err })

        Comment.find({ '_id' : comment._id })
            .populate('writer') // populate 모든 정보를 가져오는 mongo db method
            .exec( (err, result) => {
                if(err) return res.json({ success : false , err})
                res.status(200).json({ success: true, result })
            })

    });

});

router.post("/getComments", auth, (req, res) => {
  
    Comment.find({ 'postId' : req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

module.exports = router;
