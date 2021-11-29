const express = require('express');
const router = express.Router();
// const { Video } = require("../model/Video");
const { auth } = require("../middleware/auth");
const multer = require('multer');
const ffmpeg =require('fluent-ffmpeg');
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');

let storage = multer.diskStorage({
    
    destination: (req, files, cb) => {
        cb(null, '../uploads/');
        console.log('storage ~~~ 1');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
        console.log('storage ~~~ 2');
    },
    fileFilter: (req, file, cb) => {
        const ext = path.exname(file.originalname)
        if(ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});
const upload = multer({ storage: storage }).single('file');
//=================================
//             Video
//=================================

// post request 는 포스트 get request 는 get 으로 router 사용 하기
// req, res 는 call back 함수임 req 를 통하여 파일을 받음
router.post("/uploadfiles", (req, res) => {
    console.log('/upload video page ~~', req);
    // Client 에서 받은 video 를 server에 저장하기
    upload(req, res, (err) => {
        if(err) {
            console.log('upload files ', req);
            return res.json({ success: false, err })
        } else {
            // res 는 들어간 파일 경로를 client 에게 보내줌
            console.log('success ~N !!!'); 
            return res.json({ 
                success: true, 
                url: res.req.file.path, 
                fileName: req.req.file.fileName 
             })     
        }
    })
});

router.post("/uploadVideo", (req, res) => {
    // 비디오 정보들을 저장
    // req.body 는 Client 에서 보낸 Variables 들이 req.body 안에 담김
    const video = new Video(req.body) 
    
    // MongoDB 메서드로 저장시켜 줌 
    video.save((err, video) => {
        if(err) return res.json({success:false}, err);
        res.status(200).json({success: true})
    });
});

router.get("/getVideos", (req, res) => {
    // 비디오를 가져와서 Landing 비디오에 띄워주기 위함 (Client 요청에 의하여)
    // populate 는 모든 writer 정보를 가져옴 
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success:true, videos })
        })
});

router.get("/getVideoDetail", (req, res) => {
    
    Video.findOne({"_id" : req.body.videoId })
        .populate("writer")
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, videoDetail })
        })


});

router.post('/thumbnail', (res, req) => {
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.log(metadata);
        console.log(metadata.format.duration)
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성 하고 비디오 (런닝 같은 정보등 ... 가져오기)
    ffmpeg(req.body.url)
        .on('fileName', function(filenames) {
            console.log('Will generate' + filenames.join(','))
            console.log(filenames);

            filePath = 'uploads/thumbnails/' + filenames[0];
        })  
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({success: 'true', url: filePath, filDuration: fileDuration })
        })
        .on('error', function(err) {
            console.log(err);
            return res.json({success: false, err});
        })
        .screenshot({
            count: 3,
            folder: '',
            size: '320x240',
            filename: 'thumbnail%b.png'
        })
})

router.get("/getSubscriptionVideos", (req, res) => {
    
    // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec((err, subscriberInfo ) => {
            if(err) return res.status(400).send(err);
            
            let subscribedUser = [];

            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.useTo);
            })


    // 찾은 사람들의 비디오를 가지고 온다.
    // 복수 사람들을 가져오기 위하여 몽고디비 기능인 in 기능을 사용
    Video.find({ writer : { $in: subscribedUser }})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
    })
    

});


module.exports = router;