const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg =require('fluent-ffmpeg');

const { Subscriber } = require('../models/Subscriber');
const { default: Subscribe } = require('../../client/src/components/views/NavBar/Sections/Subscribe');

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", auth, (req, res) => {
    Subscriber.find({'userTo' : req.body.userTo})
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, subscribeNumber : subscribe.length })
    })
});


router.post("/subscribed", auth, (req, res) => {
    Subscriber.find({ 'userTo' : req.body.userTo, 'userFrom' : req.body.userFrom  })
        .exec((err , subscribe) => {
            if(err) return res.status(400).send(err);
            let result = false;
            if(subscribe.length !== 0) {
                result = true;
            }
            res.status(200).json({success: true, subscribed: result})
        })

});


router.post("/unSubscribe", auth, (req, res) => {
    Subscriber.findOneAndDelete({userTo : req.body.userTo, userFrom : req.body.userFrom })
        .exec((err, res) => {
            if(err) return res.status(400).json({success: false , err})
            res.status(200).json({success:true, doc})
        })
});

router.post("/subscribe", auth, (req, res) => {
    
    const subscribe = new Subscriber(req.body)

    subscribe.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true})
    })


});



module.exports = router;
